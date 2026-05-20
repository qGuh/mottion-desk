const express = require('express');
const router  = express.Router();

const { authMiddleware } = require('../middleware/auth');
const { metricas, metricasSLA } = require('../controllers/dashboardController');

// Todos os endpoints exigem autenticação
router.use(authMiddleware);

// GET /api/dashboard/metricas
router.get('/metricas', metricas);

// GET /api/dashboard/sla
router.get('/sla', metricasSLA);

module.exports = router;
