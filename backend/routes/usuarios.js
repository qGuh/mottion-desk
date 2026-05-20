const express = require('express');
const router  = express.Router();

const { authMiddleware, requirePerfil } = require('../middleware/auth');
const {
  listar,
  buscarPorId,
  criar,
  atualizar,
  toggleAtivo,
  redefinirSenha,
} = require('../controllers/usuarioController');

// Todos os endpoints exigem autenticação
router.use(authMiddleware);

// GET  /api/usuarios            (admin + agente)
router.get('/', requirePerfil('admin', 'agente'), listar);

// GET  /api/usuarios/:id
router.get('/:id', buscarPorId);

// POST /api/usuarios            (admin only)
router.post('/', requirePerfil('admin'), criar);

// PUT  /api/usuarios/:id
router.put('/:id', atualizar);

// PATCH /api/usuarios/:id/ativo  (admin only)
router.patch('/:id/ativo', requirePerfil('admin'), toggleAtivo);

// PUT  /api/usuarios/:id/senha   (admin only — redefinir senha de outro usuário)
router.put('/:id/senha', requirePerfil('admin'), redefinirSenha);

module.exports = router;
