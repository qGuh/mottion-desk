const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const pool   = require('../config/database');

// ─── LOGIN ────────────────────────────────────────────────────
const login = async (req, res, next) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({
        success: false,
        message: 'E-mail e senha são obrigatórios.',
      });
    }

    // Busca o usuário
    const [rows] = await pool.query(
      `SELECT u.id, u.nome, u.email, u.senha_hash, u.perfil, u.setor_id, u.ativo,
              s.nome AS setor_nome
       FROM usuarios u
       LEFT JOIN setores s ON u.setor_id = s.id
       WHERE u.email = ? LIMIT 1`,
      [email.trim().toLowerCase()]
    );

    if (!rows.length) {
      return res.status(401).json({ success: false, message: 'Credenciais inválidas.' });
    }

    const usuario = rows[0];

    // [DEBUG] ── remover após resolver o problema ──────────────
    console.log('Usuario encontrado:', usuario ? 'sim' : 'nao', '| Hash:', usuario?.senha_hash?.substring(0, 20));
    // ──────────────────────────────────────────────────────────

    if (!usuario.ativo) {
      return res.status(403).json({ success: false, message: 'Conta desativada. Contate o administrador.' });
    }

    // Valida a senha
    const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);

    // [DEBUG] ── remover após resolver o problema ──────────────
    console.log('Bcrypt resultado:', senhaValida);
    // ──────────────────────────────────────────────────────────

    if (!senhaValida) {
      return res.status(401).json({ success: false, message: 'Credenciais inválidas.' });
    }

    // Gera o token JWT
    const payload = {
      id:     usuario.id,
      email:  usuario.email,
      perfil: usuario.perfil,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET || 'dev_secret', {
      expiresIn: process.env.JWT_EXPIRES_IN || '8h',
    });

    // Atualiza o último login
    await pool.query('UPDATE usuarios SET ultimo_login = NOW() WHERE id = ?', [usuario.id]);

    // Remove dados sensíveis antes de retornar
    delete usuario.senha_hash;

    return res.json({
      success: true,
      message: 'Login realizado com sucesso.',
      data: {
        token,
        usuario: {
          id:         usuario.id,
          nome:       usuario.nome,
          email:      usuario.email,
          perfil:     usuario.perfil,
          setor_id:   usuario.setor_id,
          setor_nome: usuario.setor_nome,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

// ─── ME (dados do usuário logado) ─────────────────────────────
const me = async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      `SELECT u.id, u.nome, u.email, u.perfil, u.setor_id, u.ultimo_login, u.created_at,
              s.nome AS setor_nome
       FROM usuarios u
       LEFT JOIN setores s ON u.setor_id = s.id
       WHERE u.id = ? AND u.ativo = 1`,
      [req.usuario.id]
    );

    if (!rows.length) {
      return res.status(404).json({ success: false, message: 'Usuário não encontrado.' });
    }

    return res.json({ success: true, data: rows[0] });
  } catch (err) {
    next(err);
  }
};

// ─── ALTERAR SENHA ────────────────────────────────────────────
const alterarSenha = async (req, res, next) => {
  try {
    const { senha_atual, nova_senha } = req.body;

    if (!senha_atual || !nova_senha) {
      return res.status(400).json({ success: false, message: 'Senha atual e nova senha são obrigatórias.' });
    }
    if (nova_senha.length < 8) {
      return res.status(400).json({ success: false, message: 'A nova senha deve ter no mínimo 8 caracteres.' });
    }

    const [rows] = await pool.query(
      'SELECT senha_hash FROM usuarios WHERE id = ?', [req.usuario.id]
    );

    const valida = await bcrypt.compare(senha_atual, rows[0].senha_hash);
    if (!valida) {
      return res.status(400).json({ success: false, message: 'Senha atual incorreta.' });
    }

    const hash = await bcrypt.hash(nova_senha, 10);
    await pool.query('UPDATE usuarios SET senha_hash = ? WHERE id = ?', [hash, req.usuario.id]);

    return res.json({ success: true, message: 'Senha alterada com sucesso.' });
  } catch (err) {
    next(err);
  }
};

module.exports = { login, me, alterarSenha };
