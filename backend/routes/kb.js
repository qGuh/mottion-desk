const express = require('express');
const router  = express.Router();

const { authMiddleware } = require('../middleware/auth');
const { listar, buscar, criar, atualizar, excluir } = require('../controllers/kbController');

// Todos os endpoints exigem autenticação
router.use(authMiddleware);

// GET  /api/kb
router.get('/', listar);

// GET  /api/kb/:id
router.get('/:id', buscar);

// POST /api/kb
router.post('/', criar);

// PUT  /api/kb/:id
router.put('/:id', atualizar);

// DELETE /api/kb/:id
router.delete('/:id', excluir);

module.exports = router;
