const express = require('express');
const router  = express.Router();
const pool    = require('../config/database');

const { authMiddleware, requirePerfil } = require('../middleware/auth');

// Todos os endpoints exigem autenticação
router.use(authMiddleware);

// ── GET /api/setores ──────────────────────────────────────────
router.get('/', async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      `SELECT s.id, s.nome, s.descricao, s.ativo, s.created_at,
              COUNT(u.id) AS total_usuarios
       FROM setores s
       LEFT JOIN usuarios u ON u.setor_id = s.id AND u.ativo = 1
       GROUP BY s.id
       ORDER BY s.nome ASC`
    );
    return res.json({ success: true, data: rows });
  } catch (err) {
    next(err);
  }
});

// ── GET /api/setores/:id ──────────────────────────────────────
router.get('/:id', async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      `SELECT s.id, s.nome, s.descricao, s.ativo, s.created_at,
              COUNT(u.id) AS total_usuarios
       FROM setores s
       LEFT JOIN usuarios u ON u.setor_id = s.id AND u.ativo = 1
       WHERE s.id = ?
       GROUP BY s.id`,
      [req.params.id]
    );
    if (!rows.length) {
      return res.status(404).json({ success: false, message: 'Setor não encontrado.' });
    }
    return res.json({ success: true, data: rows[0] });
  } catch (err) {
    next(err);
  }
});

// ── POST /api/setores (admin only) ────────────────────────────
router.post('/', requirePerfil('admin'), async (req, res, next) => {
  try {
    const { nome, descricao = '' } = req.body;

    if (!nome || !nome.trim()) {
      return res.status(400).json({ success: false, message: 'Nome do setor é obrigatório.' });
    }

    const [result] = await pool.query(
      'INSERT INTO setores (nome, descricao, ativo) VALUES (?, ?, 1)',
      [nome.trim(), descricao.trim()]
    );

    const [rows] = await pool.query('SELECT * FROM setores WHERE id = ?', [result.insertId]);

    return res.status(201).json({
      success: true,
      message: 'Setor criado com sucesso.',
      data: rows[0],
    });
  } catch (err) {
    next(err);
  }
});

// ── PUT /api/setores/:id (admin only) ─────────────────────────
router.put('/:id', requirePerfil('admin'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nome, descricao, ativo } = req.body;

    const [existing] = await pool.query('SELECT id FROM setores WHERE id = ?', [id]);
    if (!existing.length) {
      return res.status(404).json({ success: false, message: 'Setor não encontrado.' });
    }

    const sets   = [];
    const params = [];

    if (nome !== undefined)      { sets.push('nome = ?');      params.push(nome.trim()); }
    if (descricao !== undefined) { sets.push('descricao = ?'); params.push(descricao.trim()); }
    if (ativo !== undefined)     { sets.push('ativo = ?');     params.push(Number(ativo)); }

    if (!sets.length) {
      return res.status(400).json({ success: false, message: 'Nenhum campo para atualizar.' });
    }

    params.push(id);
    await pool.query(`UPDATE setores SET ${sets.join(', ')} WHERE id = ?`, params);

    const [rows] = await pool.query('SELECT * FROM setores WHERE id = ?', [id]);
    return res.json({ success: true, message: 'Setor atualizado.', data: rows[0] });
  } catch (err) {
    next(err);
  }
});

// ── DELETE /api/setores/:id (admin only) ──────────────────────
router.delete('/:id', requirePerfil('admin'), async (req, res, next) => {
  try {
    const { id } = req.params;

    // Verifica se há usuários ou tickets vinculados
    const [[{ usuarios }]] = await pool.query(
      'SELECT COUNT(*) AS usuarios FROM usuarios WHERE setor_id = ? AND ativo = 1', [id]
    );
    const [[{ tickets }]] = await pool.query(
      "SELECT COUNT(*) AS tickets FROM tickets WHERE setor_id = ? AND status NOT IN ('resolvido','fechado')", [id]
    );

    if (usuarios > 0 || tickets > 0) {
      return res.status(409).json({
        success: false,
        message: `Não é possível excluir: ${usuarios} usuário(s) ativo(s) e ${tickets} ticket(s) aberto(s) vinculados.`,
      });
    }

    await pool.query('DELETE FROM setores WHERE id = ?', [id]);
    return res.json({ success: true, message: 'Setor excluído com sucesso.' });
  } catch (err) {
    next(err);
  }
});

// ── GET /api/setores/:id/sla (configuração de SLA do setor) ───
router.get('/:id/sla', requirePerfil('admin', 'agente'), async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM sla_config WHERE setor_id = ? ORDER BY FIELD(prioridade,'critica','alta','media','baixa')`,
      [req.params.id]
    );
    return res.json({ success: true, data: rows });
  } catch (err) {
    next(err);
  }
});

// ── PUT /api/setores/:id/sla (admin only) ─────────────────────
router.put('/:id/sla', requirePerfil('admin'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const { configuracoes } = req.body; // array: [{prioridade, horas_resolucao}]

    if (!Array.isArray(configuracoes) || !configuracoes.length) {
      return res.status(400).json({ success: false, message: 'Configurações inválidas.' });
    }

    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();

      for (const cfg of configuracoes) {
        const { prioridade, horas_resolucao } = cfg;
        await conn.query(
          `INSERT INTO sla_config (setor_id, prioridade, horas_resolucao)
           VALUES (?, ?, ?)
           ON DUPLICATE KEY UPDATE horas_resolucao = VALUES(horas_resolucao)`,
          [id, prioridade, Number(horas_resolucao)]
        );
      }

      await conn.commit();
    } catch (e) {
      await conn.rollback();
      throw e;
    } finally {
      conn.release();
    }

    const [rows] = await pool.query('SELECT * FROM sla_config WHERE setor_id = ?', [id]);
    return res.json({ success: true, message: 'SLA atualizado.', data: rows });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
