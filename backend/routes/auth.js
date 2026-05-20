const express = require('express');
const router  = express.Router();

const { authMiddleware } = require('../middleware/auth');
const { login, me, alterarSenha } = require('../controllers/authController');

// POST /api/auth/login
router.post('/login', login);

// GET /api/auth/me
router.get('/me', authMiddleware, me);

// PUT /api/auth/senha
router.put('/senha', authMiddleware, alterarSenha);

module.exports = router;
