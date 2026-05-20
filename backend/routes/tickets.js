const express = require('express');
const multer  = require('multer');
const path    = require('path');
const router  = express.Router();

const { authMiddleware, requirePerfil } = require('../middleware/auth');
const {
  listar,
  buscarPorId,
  criar,
  atualizar,
  excluir,
  adicionarComentario,
  uploadAnexo,
} = require('../controllers/ticketController');

// ── Configuração do Multer ────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.UPLOAD_DIR || 'uploads');
  },
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, unique + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: (Number(process.env.MAX_FILE_SIZE_MB) || 10) * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    // Bloqueia arquivos executáveis
    const blocked = /\.(exe|bat|sh|cmd|msi|vbs|ps1)$/i;
    if (blocked.test(file.originalname)) {
      return cb(new Error('Tipo de arquivo não permitido.'));
    }
    cb(null, true);
  },
});

// Todos os endpoints exigem autenticação
router.use(authMiddleware);

// GET  /api/tickets
router.get('/', listar);

// GET  /api/tickets/:id
router.get('/:id', buscarPorId);

// POST /api/tickets
router.post('/', criar);

// PUT  /api/tickets/:id
router.put('/:id', atualizar);

// DELETE /api/tickets/:id  (admin only)
router.delete('/:id', requirePerfil('admin'), excluir);

// POST /api/tickets/:id/comentarios
router.post('/:id/comentarios', adicionarComentario);

// POST /api/tickets/:id/anexos
router.post('/:id/anexos', upload.single('arquivo'), uploadAnexo);

module.exports = router;
