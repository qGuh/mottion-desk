/**
 * Middleware global de tratamento de erros.
 * Deve ser registrado APÓS todas as rotas no server.js.
 */
const errorHandler = (err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] ERROR ${req.method} ${req.path}:`, err.message);

  // Erros de validação do MySQL
  if (err.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({
      success: false,
      message: 'Registro duplicado — verifique os campos únicos (ex: e-mail).',
    });
  }

  if (err.code === 'ER_NO_REFERENCED_ROW_2') {
    return res.status(400).json({
      success: false,
      message: 'Referência inválida — o registro relacionado não existe.',
    });
  }

  // Erros de tamanho de payload
  if (err.type === 'entity.too.large') {
    return res.status(413).json({
      success: false,
      message: 'Payload muito grande.',
    });
  }

  // Erro genérico
  const status = err.status || err.statusCode || 500;
  res.status(status).json({
    success: false,
    message: process.env.NODE_ENV === 'production'
      ? 'Erro interno no servidor.'
      : err.message || 'Erro interno.',
  });
};

/**
 * Handler para rotas não encontradas (404).
 */
const notFound = (req, res) => {
  res.status(404).json({
    success: false,
    message: `Rota não encontrada: ${req.method} ${req.originalUrl}`,
  });
};

module.exports = { errorHandler, notFound };
