const pool = require('../config/database');

// ─── LISTAR ARTIGOS ───────────────────────────────────────────
const listar = async (req, res, next) => {
  try {
    const { busca, categoria } = req.query;
    const conditions = ['a.ativo = 1'];
    const params = [];

    if (busca) {
      conditions.push('(a.titulo LIKE ? OR a.tags LIKE ? OR a.conteudo LIKE ?)');
      const like = '%' + busca + '%';
      params.push(like, like, like);
    }

    if (categoria) {
      conditions.push('a.categoria = ?');
      params.push(categoria);
    }

    const where = conditions.length ? 'WHERE ' + conditions.join(' AND ') : '';

    const [rows] = await pool.query(
      `SELECT a.id, a.titulo, a.categoria, a.tags, a.visualizacoes, a.created_at,
              u.nome AS autor_nome
       FROM kb_artigos a
       LEFT JOIN usuarios u ON a.autor_id = u.id
       ${where}
       ORDER BY a.created_at DESC`,
      params
    );

    res.json({ success: true, data: rows });
  } catch (err) {
    next(err);
  }
};

// ─── BUSCAR ARTIGO POR ID ─────────────────────────────────────
const buscar = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [rows] = await pool.query(
      `SELECT a.*, u.nome AS autor_nome
       FROM kb_artigos a
       LEFT JOIN usuarios u ON a.autor_id = u.id
       WHERE a.id = ? AND a.ativo = 1`,
      [id]
    );

    if (!rows.length) {
      return res.status(404).json({ success: false, message: 'Artigo não encontrado.' });
    }

    // Incrementa visualizações
    await pool.query(
      'UPDATE kb_artigos SET visualizacoes = visualizacoes + 1 WHERE id = ?',
      [id]
    );

    const artigo = rows[0];
    artigo.visualizacoes = (artigo.visualizacoes || 0) + 1;

    res.json({ success: true, data: artigo });
  } catch (err) {
    next(err);
  }
};

// ─── CRIAR ARTIGO ─────────────────────────────────────────────
const criar = async (req, res, next) => {
  try {
    const { perfil } = req.usuario;
    if (perfil !== 'admin' && perfil !== 'agente') {
      return res.status(403).json({ success: false, message: 'Acesso restrito a admin e agente.' });
    }

    const { titulo, conteudo, categoria, tags } = req.body;
    if (!titulo || !conteudo) {
      return res.status(400).json({ success: false, message: 'Título e conteúdo são obrigatórios.' });
    }

    const [result] = await pool.query(
      `INSERT INTO kb_artigos (titulo, conteudo, categoria, tags, autor_id)
       VALUES (?, ?, ?, ?, ?)`,
      [titulo, conteudo, categoria || null, tags || null, req.usuario.id]
    );

    const [rows] = await pool.query(
      `SELECT a.*, u.nome AS autor_nome
       FROM kb_artigos a
       LEFT JOIN usuarios u ON a.autor_id = u.id
       WHERE a.id = ?`,
      [result.insertId]
    );

    res.status(201).json({ success: true, data: rows[0] });
  } catch (err) {
    next(err);
  }
};

// ─── ATUALIZAR ARTIGO ─────────────────────────────────────────
const atualizar = async (req, res, next) => {
  try {
    const { perfil } = req.usuario;
    if (perfil !== 'admin' && perfil !== 'agente') {
      return res.status(403).json({ success: false, message: 'Acesso restrito a admin e agente.' });
    }

    const { id } = req.params;
    const { titulo, conteudo, categoria, tags } = req.body;

    if (!titulo || !conteudo) {
      return res.status(400).json({ success: false, message: 'Título e conteúdo são obrigatórios.' });
    }

    const [check] = await pool.query(
      'SELECT id FROM kb_artigos WHERE id = ? AND ativo = 1',
      [id]
    );
    if (!check.length) {
      return res.status(404).json({ success: false, message: 'Artigo não encontrado.' });
    }

    await pool.query(
      `UPDATE kb_artigos SET titulo = ?, conteudo = ?, categoria = ?, tags = ?
       WHERE id = ?`,
      [titulo, conteudo, categoria || null, tags || null, id]
    );

    const [rows] = await pool.query(
      `SELECT a.*, u.nome AS autor_nome
       FROM kb_artigos a
       LEFT JOIN usuarios u ON a.autor_id = u.id
       WHERE a.id = ?`,
      [id]
    );

    res.json({ success: true, data: rows[0] });
  } catch (err) {
    next(err);
  }
};

// ─── EXCLUIR ARTIGO (soft delete) ────────────────────────────
const excluir = async (req, res, next) => {
  try {
    const { perfil } = req.usuario;
    if (perfil !== 'admin' && perfil !== 'agente') {
      return res.status(403).json({ success: false, message: 'Acesso restrito a admin e agente.' });
    }

    const { id } = req.params;

    const [check] = await pool.query(
      'SELECT id FROM kb_artigos WHERE id = ? AND ativo = 1',
      [id]
    );
    if (!check.length) {
      return res.status(404).json({ success: false, message: 'Artigo não encontrado.' });
    }

    await pool.query('UPDATE kb_artigos SET ativo = 0 WHERE id = ?', [id]);

    res.json({ success: true, message: 'Artigo removido com sucesso.' });
  } catch (err) {
    next(err);
  }
};

module.exports = { listar, buscar, criar, atualizar, excluir };
