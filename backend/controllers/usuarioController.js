const bcrypt = require('bcryptjs');
const pool   = require('../config/database');

// ─── LISTAR USUÁRIOS ──────────────────────────────────────────
const listar = async (req, res, next) => {
  try {
    const { busca = '', perfil = '', setor_id = '', ativo = '', page = 1, limit = 50 } = req.query;

    const conditions = [];
    const params     = [];

    if (busca.trim()) {
      conditions.push('(u.nome LIKE ? OR u.email LIKE ?)');
      params.push(`%${busca.trim()}%`, `%${busca.trim()}%`);
    }
    if (perfil)   { conditions.push('u.perfil = ?');    params.push(perfil); }
    if (setor_id) { conditions.push('u.setor_id = ?');  params.push(Number(setor_id)); }
    if (ativo !== '') { conditions.push('u.ativo = ?'); params.push(Number(ativo)); }

    const where = conditions.length ? 'WHERE ' + conditions.join(' AND ') : '';

    const offset   = (Math.max(1, Number(page)) - 1) * Number(limit);
    const limitInt = Math.min(100, Math.max(1, Number(limit)));

    const [[{ total }]] = await pool.query(
      `SELECT COUNT(*) AS total FROM usuarios u ${where}`,
      params
    );

    const [rows] = await pool.query(
      `SELECT u.id, u.nome, u.email, u.perfil, u.setor_id, u.ativo,
              u.ultimo_login, u.created_at,
              s.nome AS setor_nome,
              (SELECT COUNT(*) FROM tickets t
               WHERE t.solicitante_id = u.id AND t.status NOT IN ('resolvido','fechado')) AS tickets_abertos
       FROM usuarios u
       LEFT JOIN setores s ON u.setor_id = s.id
       ${where}
       ORDER BY u.nome ASC
       LIMIT ? OFFSET ?`,
      [...params, limitInt, offset]
    );

    return res.json({
      success: true,
      data: {
        usuarios: rows,
        pagination: {
          total,
          page: Number(page),
          limit: limitInt,
          pages: Math.ceil(total / limitInt),
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

// ─── BUSCAR POR ID ────────────────────────────────────────────
const buscarPorId = async (req, res, next) => {
  try {
    const { id } = req.params;

    // solicitante só pode ver a si mesmo
    if (req.usuario.perfil === 'solicitante' && req.usuario.id !== Number(id)) {
      return res.status(403).json({ success: false, message: 'Acesso negado.' });
    }

    const [rows] = await pool.query(
      `SELECT u.id, u.nome, u.email, u.perfil, u.setor_id, u.ativo,
              u.ultimo_login, u.created_at,
              s.nome AS setor_nome,
              (SELECT COUNT(*) FROM tickets t WHERE t.solicitante_id = u.id) AS total_tickets,
              (SELECT COUNT(*) FROM tickets t WHERE t.agente_id = u.id
               AND t.status NOT IN ('resolvido','fechado')) AS tickets_atribuidos
       FROM usuarios u
       LEFT JOIN setores s ON u.setor_id = s.id
       WHERE u.id = ?`,
      [id]
    );

    if (!rows.length) {
      return res.status(404).json({ success: false, message: 'Usuário não encontrado.' });
    }

    return res.json({ success: true, data: rows[0] });
  } catch (err) {
    next(err);
  }
};

// ─── CRIAR USUÁRIO ────────────────────────────────────────────
const criar = async (req, res, next) => {
  try {
    const { nome, email, senha, perfil = 'solicitante', setor_id = null } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({
        success: false,
        message: 'Nome, e-mail e senha são obrigatórios.',
      });
    }
    if (senha.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'A senha deve ter no mínimo 8 caracteres.',
      });
    }

    const perfisValidos = ['admin', 'agente', 'solicitante'];
    if (!perfisValidos.includes(perfil)) {
      return res.status(400).json({ success: false, message: 'Perfil inválido.' });
    }

    const hash = await bcrypt.hash(senha, 10);

    const [result] = await pool.query(
      `INSERT INTO usuarios (nome, email, senha_hash, perfil, setor_id, ativo)
       VALUES (?, ?, ?, ?, ?, 1)`,
      [nome.trim(), email.trim().toLowerCase(), hash, perfil, setor_id || null]
    );

    const [rows] = await pool.query(
      `SELECT u.id, u.nome, u.email, u.perfil, u.setor_id, u.ativo, u.created_at,
              s.nome AS setor_nome
       FROM usuarios u
       LEFT JOIN setores s ON u.setor_id = s.id
       WHERE u.id = ?`,
      [result.insertId]
    );

    return res.status(201).json({
      success: true,
      message: 'Usuário criado com sucesso.',
      data: rows[0],
    });
  } catch (err) {
    next(err);
  }
};

// ─── ATUALIZAR USUÁRIO ────────────────────────────────────────
const atualizar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const isAdmin = req.usuario.perfil === 'admin';

    // Solicitante só pode editar a si mesmo (apenas nome e senha via /auth/senha)
    if (!isAdmin && req.usuario.id !== Number(id)) {
      return res.status(403).json({ success: false, message: 'Acesso negado.' });
    }

    const [existing] = await pool.query('SELECT id FROM usuarios WHERE id = ?', [id]);
    if (!existing.length) {
      return res.status(404).json({ success: false, message: 'Usuário não encontrado.' });
    }

    const { nome, email, perfil, setor_id, ativo } = req.body;
    const sets   = [];
    const params = [];

    if (nome !== undefined)  { sets.push('nome = ?');     params.push(nome.trim()); }
    if (email !== undefined) { sets.push('email = ?');    params.push(email.trim().toLowerCase()); }

    // Somente admin pode alterar perfil, setor e status
    if (isAdmin) {
      if (perfil !== undefined)    { sets.push('perfil = ?');    params.push(perfil); }
      if (setor_id !== undefined)  { sets.push('setor_id = ?');  params.push(setor_id || null); }
      if (ativo !== undefined)     { sets.push('ativo = ?');     params.push(Number(ativo)); }
    }

    if (!sets.length) {
      return res.status(400).json({ success: false, message: 'Nenhum campo para atualizar.' });
    }

    params.push(id);
    await pool.query(`UPDATE usuarios SET ${sets.join(', ')} WHERE id = ?`, params);

    const [rows] = await pool.query(
      `SELECT u.id, u.nome, u.email, u.perfil, u.setor_id, u.ativo, u.created_at,
              s.nome AS setor_nome
       FROM usuarios u
       LEFT JOIN setores s ON u.setor_id = s.id
       WHERE u.id = ?`,
      [id]
    );

    return res.json({
      success: true,
      message: 'Usuário atualizado com sucesso.',
      data: rows[0],
    });
  } catch (err) {
    next(err);
  }
};

// ─── DESATIVAR / REATIVAR USUÁRIO ─────────────────────────────
const toggleAtivo = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req.usuario.id === Number(id)) {
      return res.status(400).json({ success: false, message: 'Você não pode desativar sua própria conta.' });
    }

    const [rows] = await pool.query('SELECT id, ativo FROM usuarios WHERE id = ?', [id]);
    if (!rows.length) {
      return res.status(404).json({ success: false, message: 'Usuário não encontrado.' });
    }

    const novoStatus = rows[0].ativo ? 0 : 1;
    await pool.query('UPDATE usuarios SET ativo = ? WHERE id = ?', [novoStatus, id]);

    return res.json({
      success: true,
      message: novoStatus ? 'Usuário reativado.' : 'Usuário desativado.',
      data: { id: Number(id), ativo: novoStatus },
    });
  } catch (err) {
    next(err);
  }
};

// ─── REDEFINIR SENHA (admin) ──────────────────────────────────
const redefinirSenha = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nova_senha } = req.body;

    if (!nova_senha || nova_senha.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'A nova senha deve ter no mínimo 8 caracteres.',
      });
    }

    const [rows] = await pool.query('SELECT id FROM usuarios WHERE id = ?', [id]);
    if (!rows.length) {
      return res.status(404).json({ success: false, message: 'Usuário não encontrado.' });
    }

    const hash = await bcrypt.hash(nova_senha, 10);
    await pool.query('UPDATE usuarios SET senha_hash = ? WHERE id = ?', [hash, id]);

    return res.json({ success: true, message: 'Senha redefinida com sucesso.' });
  } catch (err) {
    next(err);
  }
};

module.exports = { listar, buscarPorId, criar, atualizar, toggleAtivo, redefinirSenha };
