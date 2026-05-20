const express        = require('express');
const router         = express.Router();
const { authMiddleware } = require('../middleware/auth');
const { triar }      = require('../controllers/iaController');

// POST /api/ia/triar
router.post('/triar', authMiddleware, triar);

module.exports = router;
