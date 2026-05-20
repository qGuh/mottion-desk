const jwt = require('jsonwebtoken');
const pool = require('../config/database');

/**
 * Middleware de autenticação JWT.
 * Extrai o token do header Authorization: Bearer <token>
 * Injeta req.usuario com os dados do usuário autenticado.
 */
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';
    const [scheme, token] = authHeader.split(' ');

    if (scheme !== 'Bearer' || !token) {
      return res.status(401).json({
        success: false,
        message: 'Token de autenticação ausente.',
      });
    }

    // Verifica e decodifica o token
    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');
    } catch (err) {
      const msg = err.name === 'TokenExpiredError'
        ? 'Token expirado. Faça login novamente.'
        : 'Token inválido.';
      return res.status(401).json({ success: false, message: msg });
    }

    // Busca o usuário no banco (garante que ainda está ativo)
    const [rows] = await pool.query(
      'SELECT id, nome, email, perfil, setor_id, ativo FROM usuarios WHERE id = ?',
      [payload.id]
    );

    if (!rows.length || !rows[0].ativo) {
      return res.status(401).json({
        success: false,
        message: 'Usuário não encontrado ou inativo.',
      });
    }

    req.usuario = rows[0];
    next();
  } catch (err) {
    next(err);
  }
};

/**
 * Middleware de autorização por perfil.
 * Uso: requirePerfil('admin') ou requirePerfil('admin', 'agente')
 */
const requirePerfil = (...perfis) => (req, res, next) => {
  if (!req.usuario) {
    return res.status(401).json({ success: false, message: 'Não autenticado.' });
  }
  if (!perfis.includes(req.usuario.perfil)) {
    return res.status(403).json({
      success: false,
      message: `Acesso restrito a: ${perfis.join(', ')}.`,
    });
  }
  next();
};

module.exports = { authMiddleware, requirePerfil };
