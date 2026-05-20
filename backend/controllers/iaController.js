// Node 18+ tem fetch nativo — sem dependências extras
// ─── TRIAGEM DE TICKET ─────────────────────────────────────────
const triar = async (req, res, next) => {
  try {
    const { titulo, descricao } = req.body;

    if (!titulo?.trim()) {
      return res.status(400).json({ success: false, message: 'Título é obrigatório.' });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return res.status(503).json({ success: false, message: 'ANTHROPIC_API_KEY não configurada.' });
    }

    const prompt = `Você é um agente de triagem de tickets de TI. Analise o ticket abaixo e retorne APENAS um JSON válido, sem markdown, sem explicações.

Ticket:
- Título: "${titulo.trim()}"
- Descrição: "${(descricao || '').trim() || '(sem descrição)'}"

Retorne exatamente este JSON:
{
  "categoria": "<uma das opções: Suporte, Manutenção, Solicitação, Incidente, Melhoria, Acesso, Outro>",
  "prioridade": "<uma das opções: baixa, media, alta, critica>",
  "resumo": "<resumo objetivo do problema em no máximo 15 palavras>",
  "palavras_chave": ["<palavra1>", "<palavra2>", "<palavra3>"]
}

Regras:
- categoria "Incidente" = sistema parado, falha crítica, indisponibilidade
- categoria "Acesso" = senha, login, permissão, bloqueio
- categoria "Manutenção" = conserto, reparo, hardware com defeito
- categoria "Solicitação" = pedido de novo recurso, equipamento ou acesso
- categoria "Melhoria" = otimização, sugestão de melhoria
- categoria "Suporte" = dúvida técnica, orientação, configuração
- prioridade "critica" = impacto total, múltiplos usuários afetados
- prioridade "alta" = um usuário ou serviço indisponível
- prioridade "media" = degradação parcial, workaround possível
- prioridade "baixa" = cosmético, sem impacto operacional`;

    const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type':      'application/json',
        'x-api-key':         apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model:      'claude-haiku-4-5',
        max_tokens: 256,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!anthropicRes.ok) {
      const errText = await anthropicRes.text();
      console.error('[IA] Anthropic error:', anthropicRes.status, errText);
      // Mensagens específicas por código de erro
      let userMsg = 'Erro ao chamar a API de IA.';
      try {
        const errJson = JSON.parse(errText);
        const msg = errJson?.error?.message || '';
        if (anthropicRes.status === 401) userMsg = 'Chave de API inválida ou expirada.';
        else if (anthropicRes.status === 429) userMsg = 'Limite de requisições atingido. Tente novamente em instantes.';
        else if (msg.toLowerCase().includes('credit')) userMsg = 'Saldo de créditos Anthropic insuficiente. Acesse console.anthropic.com para recarregar.';
      } catch (_) {}
      return res.status(502).json({ success: false, message: userMsg });
    }

    const anthropicData = await anthropicRes.json();
    const rawText = anthropicData?.content?.[0]?.text || '';

    // Extrai o JSON da resposta (pode vir com ```json ... ```)
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('[IA] JSON não encontrado na resposta:', rawText);
      return res.status(502).json({ success: false, message: 'Resposta da IA em formato inválido.' });
    }

    let sugestao;
    try {
      sugestao = JSON.parse(jsonMatch[0]);
    } catch (e) {
      console.error('[IA] Falha ao parsear JSON:', jsonMatch[0]);
      return res.status(502).json({ success: false, message: 'Resposta da IA em formato inválido.' });
    }

    // Valida e sanitiza os campos
    const categoriasValidas = ['Suporte', 'Manutenção', 'Solicitação', 'Incidente', 'Melhoria', 'Acesso', 'Outro'];
    const prioridadesValidas = ['baixa', 'media', 'alta', 'critica'];

    const resultado = {
      categoria:     categoriasValidas.includes(sugestao.categoria)    ? sugestao.categoria  : 'Suporte',
      prioridade:    prioridadesValidas.includes(sugestao.prioridade)   ? sugestao.prioridade : 'media',
      resumo:        typeof sugestao.resumo === 'string'               ? sugestao.resumo.slice(0, 120) : '',
      palavras_chave: Array.isArray(sugestao.palavras_chave)           ? sugestao.palavras_chave.slice(0, 5) : [],
    };

    return res.json({ success: true, data: resultado });
  } catch (err) {
    next(err);
  }
};

module.exports = { triar };
