const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host:            process.env.DB_HOST     || 'localhost',
  port:            Number(process.env.DB_PORT) || 3306,
  user:            process.env.DB_USER     || 'root',
  password:        process.env.DB_PASS     || '',
  database:        process.env.DB_NAME     || 'mottion_desk',
  waitForConnections: true,
  connectionLimit:    20,
  queueLimit:         0,
  timezone:           '-03:00',
  charset:            'utf8mb4',
});

// Testa a conexão na inicialização
pool.getConnection()
  .then(conn => {
    console.log('✅ MySQL conectado — banco:', process.env.DB_NAME);
    conn.release();
  })
  .catch(err => {
    console.error('❌ Falha na conexão MySQL:', err.message);
    process.exit(1);
  });

module.exports = pool;
