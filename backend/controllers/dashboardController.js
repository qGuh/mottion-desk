const pool = require('../config/database');

// ─── MÉTRICAS GERAIS ──────────────────────────────────────────
const metricas = async (req, res, next) => {
  try {
    const isAdmin  = req.usuario.perfil === 'admin';
    const isAgente = req.usuario.perfil === 'agente';

    // Filtro de visibilidade: solicitante vê só os seus
    const baseFilter  = req.usuario.perfil === 'solicitante'
      ? `AND t.solicitante_id = ${pool.escape(req.usuario.id)}`
      : '';

    // ── Totais por status ────────────────────────────────────
    const [totaisStatus] = await pool.query(
      `SELECT status, COUNT(*) AS total
       FROM tickets t
       WHERE 1=1 ${baseFilter}
       GROUP BY status`
    );

    const statusMap = { aberto: 0, em_andamento: 0, aguardando: 0, resolvido: 0, fechado: 0 };
    totaisStatus.forEach(r => { statusMap[r.status] = r.total; });
    const totalGeral = Object.values(statusMap).reduce((a, b) => a + b, 0);

    // ── Totais por prioridade ────────────────────────────────
    const [totaisPrio] = await pool.query(
      `SELECT prioridade, COUNT(*) AS total
       FROM tickets t
       WHERE status NOT IN ('resolvido','fechado') ${baseFilter}
       GROUP BY prioridade`
    );

    // ── Tickets por setor ────────────────────────────────────
    const [porSetor] = await pool.query(
      `SELECT COALESCE(s.nome, 'Sem setor') AS setor, COUNT(t.id) AS total,
              SUM(CASE WHEN t.status NOT IN ('resolvido','fechado') THEN 1 ELSE 0 END) AS abertos
       FROM tickets t
       LEFT JOIN setores s ON t.setor_id = s.id
       WHERE 1=1 ${baseFilter}
       GROUP BY t.setor_id, s.nome
       ORDER BY total DESC`
    );

    // ── SLA violados ─────────────────────────────────────────
    const [slaViolados] = await pool.query(
      `SELECT COUNT(*) AS total
       FROM tickets t
       WHERE t.sla_prazo IS NOT NULL
         AND t.sla_prazo < NOW()
         AND t.status NOT IN ('resolvido','fechado')
         ${baseFilter}`
    );

    // ── Tempo médio de resolução (horas) ─────────────────────
    const [tempoMedio] = await pool.query(
      `SELECT ROUND(AVG(TIMESTAMPDIFF(MINUTE, created_at, updated_at)) / 60, 1) AS horas_media
       FROM tickets
       WHERE status IN ('resolvido','fechado')
         AND TIMESTAMPDIFF(MINUTE, created_at, updated_at) > 0
         ${baseFilter.replace(/t\./g, '')}`   // tabela sem alias
    );

    // ── Resolvidos hoje ──────────────────────────────────────
    const [resolHojeRes] = await pool.query(
      `SELECT COUNT(*) AS total
       FROM tickets t
       WHERE DATE(updated_at) = CURDATE()
         AND status IN ('resolvido','fechado')
         ${baseFilter}`
    );
    const resolvidosHoje = Number(resolHojeRes[0].total) || 0;

    // ── Volume dos últimos 7 dias (criados + resolvidos/dia) ──
    const [vol7criados] = await pool.query(
      `SELECT DATE_FORMAT(DATE(created_at), '%Y-%m-%d') AS dia, COUNT(*) AS total
       FROM tickets t
       WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)
         ${baseFilter}
       GROUP BY dia
       ORDER BY dia ASC`
    );
    const [vol7resolvidos] = await pool.query(
      `SELECT DATE_FORMAT(DATE(updated_at), '%Y-%m-%d') AS dia, COUNT(*) AS resolvidos
       FROM tickets t
       WHERE updated_at >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)
         AND status IN ('resolvido','fechado')
         ${baseFilter}
       GROUP BY dia
       ORDER BY dia ASC`
    );
    // Merge into a single array indexed by YYYY-MM-DD day
    const _vol7Map = {};
    vol7criados.forEach(r => {
      _vol7Map[r.dia] = { data: r.dia, total: Number(r.total), resolvidos: 0 };
    });
    vol7resolvidos.forEach(r => {
      if (!_vol7Map[r.dia]) _vol7Map[r.dia] = { data: r.dia, total: 0, resolvidos: 0 };
      _vol7Map[r.dia].resolvidos = Number(r.resolvidos);
    });
    const volume7dias = Object.values(_vol7Map).sort((a, b) => a.data < b.data ? -1 : 1);

    // ── Ranking agentes: resolvidos + MTTR (admin/agente only) ──
    let agentesRanking = [];
    if (isAdmin || isAgente) {
      const [rows] = await pool.query(
        `SELECT u.id, u.nome,
                COUNT(t.id) AS resolvidos,
                ROUND(AVG(TIMESTAMPDIFF(MINUTE, t.created_at, t.updated_at)) / 60, 1) AS tempo_medio_horas
         FROM usuarios u
         INNER JOIN tickets t ON t.agente_id = u.id
           AND t.status IN ('resolvido','fechado')
         WHERE u.perfil IN ('agente','admin')
           AND u.ativo = 1
         GROUP BY u.id, u.nome
         ORDER BY resolvidos DESC
         LIMIT 10`
      );
      agentesRanking = rows;
    }

    // ── Últimos 5 tickets (preview) ──────────────────────────
    const [ultimosTickets] = await pool.query(
      `SELECT t.id, t.numero, t.titulo, t.status, t.prioridade,
              t.created_at,
              u.nome AS solicitante_nome,
              s.nome AS setor_nome
       FROM tickets t
       JOIN usuarios u ON t.solicitante_id = u.id
       LEFT JOIN setores s ON t.setor_id = s.id
       WHERE 1=1 ${baseFilter}
       ORDER BY t.created_at DESC
       LIMIT 5`
    );

    return res.json({
      success: true,
      data: {
        // Flat status totals (direct access in frontend)
        totais:             { ...statusMap },
        totalGeral,
        por_prioridade:     totaisPrio,
        sla_violados:       Number(slaViolados[0].total) || 0,
        tempoMedioResolucao: Number(tempoMedio[0].horas_media) || 0,
        resolvidosHoje,
        por_setor:          porSetor,
        volume_7dias:       volume7dias,
        ranking_agentes:    agentesRanking,
        ultimos_tickets:    ultimosTickets,
      },
    });
  } catch (err) {
    next(err);
  }
};

// ─── MÉTRICAS DE SLA DETALHADAS ───────────────────────────────
const metricasSLA = async (req, res, next) => {
  try {
    const { setor_id, periodo = 30 } = req.query;

    const conditions = [`created_at >= DATE_SUB(NOW(), INTERVAL ${Number(periodo)} DAY)`];
    const params     = [];

    if (setor_id) {
      conditions.push('setor_id = ?');
      params.push(Number(setor_id));
    }

    const where = 'WHERE ' + conditions.join(' AND ');

    const [rows] = await pool.query(
      `SELECT
         prioridade,
         COUNT(*) AS total,
         SUM(CASE WHEN sla_prazo IS NOT NULL AND NOW() > sla_prazo
                       AND status NOT IN ('resolvido','fechado') THEN 1 ELSE 0 END) AS violados_abertos,
         SUM(CASE WHEN sla_prazo IS NOT NULL AND updated_at > sla_prazo
                       AND status IN ('resolvido','fechado') THEN 1 ELSE 0 END) AS violados_resolvidos,
         SUM(CASE WHEN sla_prazo IS NOT NULL AND status IN ('resolvido','fechado')
                       AND updated_at <= sla_prazo THEN 1 ELSE 0 END) AS cumpridos,
         ROUND(AVG(CASE WHEN status IN ('resolvido','fechado')
                        THEN TIMESTAMPDIFF(MINUTE, created_at, updated_at) END) / 60, 1) AS tempo_medio_hrs
       FROM tickets
       ${where}
       GROUP BY prioridade
       ORDER BY FIELD(prioridade,'critica','alta','media','baixa')`,
      params
    );

    // Add computed sla_rate and conformes alias for the frontend
    const enriched = rows.map(r => ({
      ...r,
      conformes: Number(r.cumpridos) || 0,
      sla_rate:  r.total > 0 ? Math.round((Number(r.cumpridos) || 0) / r.total * 100) : 100,
    }));
    return res.json({ success: true, data: enriched });
  } catch (err) {
    next(err);
  }
};

module.exports = { metricas, metricasSLA };
