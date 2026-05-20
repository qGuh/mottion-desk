require('dotenv').config({ override: true });

const express     = require('express');
const http        = require('http');
const cors        = require('cors');
const path        = require('path');
const { Server }  = require('socket.io');
const rateLimit   = require('express-rate-limit');

const { errorHandler, notFound } = require('./middleware/errorHandler');

// ─── Rotas ────────────────────────────────────────────────────
const authRoutes      = require('./routes/auth');
const ticketRoutes    = require('./routes/tickets');
const usuarioRoutes   = require('./routes/usuarios');
const setorRoutes     = require('./routes/setores');
const dashboardRoutes = require('./routes/dashboard');
const kbRoutes        = require('./routes/kb');
const iaRoutes        = require('./routes/ia');

// ─── App & HTTP Server ────────────────────────────────────────
const app    = express();
const server = http.createServer(app);

// ─── Socket.io ────────────────────────────────────────────────
const io = new Server(server, {
  cors: {
    origin:  process.env.FRONTEND_ORIGIN || 'http://localhost:5500',
    methods: ['GET', 'POST'],
  },
  transports: ['websocket', 'polling'],
});

// Expõe io para os controllers via app.locals
app.locals.io = io;

io.on('connection', (socket) => {
  console.log(`[Socket.io] cliente conectado: ${socket.id}`);

  // Agente ou admin entra na sala "agentes"
  socket.on('join:agentes', () => {
    socket.join('agentes');
  });

  // Usuário entra na sala pessoal
  socket.on('join:user', (userId) => {
    if (userId) socket.join(`user:${userId}`);
  });

  socket.on('disconnect', () => {
    console.log(`[Socket.io] cliente desconectado: ${socket.id}`);
  });
});

// ─── CORS ─────────────────────────────────────────────────────
const allowedOrigins = [
  process.env.FRONTEND_ORIGIN || 'http://localhost:5500',
  'http://127.0.0.1:5500',
  'http://localhost:3000',
  'http://localhost:8080',
  'http://127.0.0.1:8080',
];

app.use(cors({
  origin: (origin, callback) => {
    // Permite requisições sem origin (ex: Postman, curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: origem não permitida — ${origin}`));
    }
  },
  credentials:      true,
  allowedHeaders:   ['Content-Type', 'Authorization'],
  exposedHeaders:   ['X-Total-Count'],
  methods:          ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
}));

// ─── Body Parsing ─────────────────────────────────────────────
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

// ─── Rate Limiting ────────────────────────────────────────────
const limiterGeral = rateLimit({
  windowMs:          15 * 60 * 1000, // 15 min
  max:               300,
  standardHeaders:   true,
  legacyHeaders:     false,
  message:           { success: false, message: 'Muitas requisições. Tente novamente em 15 minutos.' },
});

const limiterLogin = rateLimit({
  windowMs:          15 * 60 * 1000,
  max:               20,
  standardHeaders:   true,
  legacyHeaders:     false,
  message:           { success: false, message: 'Muitas tentativas de login. Aguarde 15 minutos.' },
  keyGenerator:      (req) => req.ip + ':login',
});

app.use('/api/', limiterGeral);
app.use('/api/auth/login', limiterLogin);

// ─── Uploads (arquivos estáticos) ─────────────────────────────
const uploadDir = path.resolve(process.env.UPLOAD_DIR || 'uploads');
app.use('/uploads', express.static(uploadDir));

// ─── Health check ─────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    service: 'Mottion Desk API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development',
  });
});

// ─── Rotas da API ─────────────────────────────────────────────
app.use('/api/auth',      authRoutes);
app.use('/api/tickets',   ticketRoutes);
app.use('/api/usuarios',  usuarioRoutes);
app.use('/api/setores',   setorRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/kb',        kbRoutes);
app.use('/api/ia',        iaRoutes);

// ─── 404 e Error handler ──────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

// ─── Start ────────────────────────────────────────────────────
const PORT = Number(process.env.PORT) || 3001;

server.listen(PORT, () => {
  console.log('');
  console.log('╔══════════════════════════════════════════╗');
  console.log('║       Mottion Desk — API Server          ║');
  console.log(`║  Rodando em http://localhost:${PORT}        ║`);
  console.log(`║  Ambiente: ${(process.env.NODE_ENV || 'development').padEnd(30)}║`);
  console.log('╚══════════════════════════════════════════╝');
  console.log('');
});

// ─── Graceful shutdown ────────────────────────────────────────
process.on('SIGTERM', () => {
  console.log('[Server] SIGTERM recebido — encerrando graciosamente…');
  server.close(() => {
    console.log('[Server] Servidor encerrado.');
    process.exit(0);
  });
});

module.exports = { app, server, io };
