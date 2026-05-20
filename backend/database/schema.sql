-- ============================================================
-- Mottion Desk — Schema do Banco de Dados
-- MySQL 8.0+  |  charset: utf8mb4
-- ============================================================

CREATE DATABASE IF NOT EXISTS mottion_desk
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE mottion_desk;

-- ─── SETORES ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS setores (
  id          INT UNSIGNED    NOT NULL AUTO_INCREMENT,
  nome        VARCHAR(100)    NOT NULL,
  descricao   VARCHAR(255)    NULL,
  ativo       TINYINT(1)      NOT NULL DEFAULT 1,
  created_at  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uk_setor_nome (nome)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── USUÁRIOS ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS usuarios (
  id          INT UNSIGNED    NOT NULL AUTO_INCREMENT,
  nome        VARCHAR(120)    NOT NULL,
  email       VARCHAR(150)    NOT NULL,
  senha_hash  VARCHAR(255)    NOT NULL,
  perfil      ENUM('admin','agente','solicitante') NOT NULL DEFAULT 'solicitante',
  setor_id    INT UNSIGNED    NULL,
  ativo       TINYINT(1)      NOT NULL DEFAULT 1,
  avatar_url  VARCHAR(255)    NULL,
  ultimo_login DATETIME       NULL,
  created_at  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uk_email (email),
  CONSTRAINT fk_usuario_setor FOREIGN KEY (setor_id)
    REFERENCES setores(id) ON DELETE SET NULL ON UPDATE CASCADE,
  INDEX idx_perfil (perfil),
  INDEX idx_ativo  (ativo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── TICKETS ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS tickets (
  id              INT UNSIGNED    NOT NULL AUTO_INCREMENT,
  numero          VARCHAR(20)     NOT NULL,           -- ex: TK-2026-00001
  titulo          VARCHAR(200)    NOT NULL,
  descricao       TEXT            NOT NULL,
  status          ENUM('aberto','em_andamento','aguardando','resolvido','fechado')
                                  NOT NULL DEFAULT 'aberto',
  prioridade      ENUM('baixa','media','alta','critica')
                                  NOT NULL DEFAULT 'media',
  categoria       VARCHAR(100)    NULL,
  setor_id        INT UNSIGNED    NULL,
  solicitante_id  INT UNSIGNED    NOT NULL,
  agente_id       INT UNSIGNED    NULL,
  sla_prazo       DATETIME        NULL,               -- calculado na criação
  sla_violado     TINYINT(1)      NOT NULL DEFAULT 0,
  created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  resolvido_at    DATETIME        NULL,
  fechado_at      DATETIME        NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uk_numero (numero),
  CONSTRAINT fk_ticket_setor       FOREIGN KEY (setor_id)       REFERENCES setores(id)  ON DELETE SET NULL,
  CONSTRAINT fk_ticket_solicitante FOREIGN KEY (solicitante_id) REFERENCES usuarios(id) ON DELETE RESTRICT,
  CONSTRAINT fk_ticket_agente      FOREIGN KEY (agente_id)      REFERENCES usuarios(id) ON DELETE SET NULL,
  INDEX idx_status     (status),
  INDEX idx_prioridade (prioridade),
  INDEX idx_agente     (agente_id),
  INDEX idx_solicitante(solicitante_id),
  INDEX idx_created    (created_at),
  INDEX idx_sla_violado(sla_violado)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── SLA CONFIG ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS sla_config (
  id          INT UNSIGNED    NOT NULL AUTO_INCREMENT,
  prioridade  ENUM('baixa','media','alta','critica') NOT NULL,
  tempo_horas INT UNSIGNED    NOT NULL,               -- tempo em horas para resolução
  setor_id    INT UNSIGNED    NULL,                   -- NULL = regra global
  ativo       TINYINT(1)      NOT NULL DEFAULT 1,
  created_at  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_sla_setor FOREIGN KEY (setor_id) REFERENCES setores(id) ON DELETE CASCADE,
  UNIQUE KEY uk_sla_prioridade_setor (prioridade, setor_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── COMENTÁRIOS ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS comentarios (
  id          INT UNSIGNED    NOT NULL AUTO_INCREMENT,
  ticket_id   INT UNSIGNED    NOT NULL,
  usuario_id  INT UNSIGNED    NOT NULL,
  conteudo    TEXT            NOT NULL,
  interno     TINYINT(1)      NOT NULL DEFAULT 0,     -- 1 = nota interna (só agentes veem)
  created_at  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_comment_ticket  FOREIGN KEY (ticket_id)  REFERENCES tickets(id)  ON DELETE CASCADE,
  CONSTRAINT fk_comment_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE RESTRICT,
  INDEX idx_ticket (ticket_id),
  INDEX idx_created(created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── HISTÓRICO DE TICKETS ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS historico_tickets (
  id              INT UNSIGNED    NOT NULL AUTO_INCREMENT,
  ticket_id       INT UNSIGNED    NOT NULL,
  usuario_id      INT UNSIGNED    NULL,
  campo_alterado  VARCHAR(80)     NOT NULL,
  valor_anterior  TEXT            NULL,
  valor_novo      TEXT            NULL,
  created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_hist_ticket  FOREIGN KEY (ticket_id)  REFERENCES tickets(id)  ON DELETE CASCADE,
  CONSTRAINT fk_hist_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL,
  INDEX idx_ticket  (ticket_id),
  INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── ANEXOS ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS anexos (
  id              INT UNSIGNED    NOT NULL AUTO_INCREMENT,
  ticket_id       INT UNSIGNED    NOT NULL,
  usuario_id      INT UNSIGNED    NULL,
  nome_arquivo    VARCHAR(255)    NOT NULL,
  nome_original   VARCHAR(255)    NOT NULL,
  caminho         VARCHAR(500)    NOT NULL,
  tipo_mime       VARCHAR(100)    NULL,
  tamanho         INT UNSIGNED    NOT NULL DEFAULT 0,  -- bytes
  created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_anexo_ticket  FOREIGN KEY (ticket_id)  REFERENCES tickets(id)  ON DELETE CASCADE,
  CONSTRAINT fk_anexo_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL,
  INDEX idx_ticket (ticket_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── SEEDS INICIAIS ────────────────────────────────────────────

-- Setores padrão
INSERT IGNORE INTO setores (nome, descricao) VALUES
  ('TI',            'Setor de Tecnologia da Informação'),
  ('RH',            'Recursos Humanos'),
  ('Financeiro',    'Setor Financeiro'),
  ('Operações',     'Operações e Logística'),
  ('Comercial',     'Vendas e Comercial'),
  ('Administrativo','Administrativo e Gestão');

-- SLA padrão (regras globais)
INSERT IGNORE INTO sla_config (prioridade, tempo_horas, setor_id) VALUES
  ('baixa',   48, NULL),
  ('media',   24, NULL),
  ('alta',     8, NULL),
  ('critica',  2, NULL);

-- Usuário admin padrão (senha: Admin@123)
-- Hash gerado com bcrypt cost=10  →  node -e "require('bcryptjs').hash('Admin@123',10).then(console.log)"
INSERT IGNORE INTO usuarios (nome, email, senha_hash, perfil, setor_id) VALUES
  (
    'Admin',
    'admin@mottion.com',
    '$2a$10$nN9fysknGSBX7EdQJLKulOkWNizuhK9lYtIrZesM6LxZhFkQfagRK',
    'admin',
    1
  );

-- ─── VIEWS ÚTEIS ──────────────────────────────────────────────

CREATE OR REPLACE VIEW v_tickets_completo AS
SELECT
  t.id,
  t.numero,
  t.titulo,
  t.status,
  t.prioridade,
  t.categoria,
  t.sla_prazo,
  t.sla_violado,
  t.created_at,
  t.updated_at,
  t.resolvido_at,
  s.nome   AS setor_nome,
  sol.nome AS solicitante_nome,
  sol.email AS solicitante_email,
  ag.nome  AS agente_nome,
  ag.email AS agente_email,
  TIMESTAMPDIFF(MINUTE, t.created_at, IFNULL(t.resolvido_at, NOW())) AS tempo_resolucao_min,
  (SELECT COUNT(*) FROM comentarios c WHERE c.ticket_id = t.id AND c.interno = 0) AS total_comentarios
FROM tickets t
LEFT JOIN setores  s   ON t.setor_id       = s.id
LEFT JOIN usuarios sol ON t.solicitante_id = sol.id
LEFT JOIN usuarios ag  ON t.agente_id      = ag.id;

CREATE OR REPLACE VIEW v_metricas_dashboard AS
SELECT
  COUNT(*)                                                      AS total_tickets,
  SUM(status = 'aberto')                                       AS abertos,
  SUM(status = 'em_andamento')                                 AS em_andamento,
  SUM(status = 'aguardando')                                   AS aguardando,
  SUM(status = 'resolvido')                                    AS resolvidos,
  SUM(status = 'fechado')                                      AS fechados,
  SUM(sla_violado = 1)                                         AS sla_violados,
  ROUND(AVG(CASE WHEN resolvido_at IS NOT NULL
    THEN TIMESTAMPDIFF(MINUTE, created_at, resolvido_at) END) / 60, 1) AS tempo_medio_horas,
  SUM(prioridade = 'critica')                                  AS criticos,
  SUM(prioridade = 'alta')                                     AS alta_prioridade
FROM tickets
WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY);

-- ─── BASE DE CONHECIMENTO ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS kb_artigos (
  id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  titulo        VARCHAR(255) NOT NULL,
  conteudo      TEXT NOT NULL,
  categoria     VARCHAR(100),
  tags          VARCHAR(500),
  autor_id      INT UNSIGNED,
  visualizacoes INT DEFAULT 0,
  ativo         TINYINT DEFAULT 1,
  created_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (autor_id) REFERENCES usuarios(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO kb_artigos (titulo, conteudo, categoria, tags, autor_id) VALUES
('Como resetar senha do sistema',
'# Como resetar senha do sistema\n\n## Passo a passo\n\n1. Acesse o sistema com seu e-mail\n2. Clique em **"Esqueci minha senha"** na tela de login\n3. Informe seu e-mail cadastrado\n4. Verifique sua caixa de entrada\n5. Clique no link recebido e defina uma nova senha\n\n## Requisitos da nova senha\n\n- Mínimo de **8 caracteres**\n- Ao menos uma letra maiúscula\n- Ao menos um número\n\n## Ainda com problemas?\n\nAbra um ticket com a categoria **Acesso** e descreva o problema.',
'Acesso', 'senha,login,acesso,resetar,esqueci', 1),

('Impressora não imprime — guia de solução',
'# Impressora não imprime — guia de solução\n\n## Verificações iniciais\n\n- Verifique se a impressora está **ligada** e com o painel aceso\n- Confirme que o **cabo USB ou rede** está conectado\n- Veja se há **papel** na bandeja\n\n## Passo a passo\n\n1. Abra **Painel de Controle → Dispositivos e Impressoras**\n2. Clique com o botão direito na impressora e selecione **"Ver o que está sendo impresso"**\n3. Cancele todos os trabalhos na fila\n4. Clique em **Impressora → Usar impressora offline** (desmarque se estiver marcado)\n5. Tente imprimir uma página de teste\n\n## Se ainda não funcionar\n\n- Remova e reinstale o driver da impressora\n- Reinicie o serviço **Spooler de Impressão** (services.msc)\n\nSe o problema persistir, abra um ticket com categoria **Hardware**.',
'Hardware', 'impressora,imprimir,driver,spooler,hardware', 1),

('Como solicitar novo equipamento',
'# Como solicitar novo equipamento\n\n## Quando solicitar\n\nUse este processo para solicitar: computadores, notebooks, monitores, teclados, mouses, headsets e outros periféricos.\n\n## Como abrir a solicitação\n\n1. Clique em **"Novo Ticket"** no menu superior\n2. Preencha o título: ex. _"Solicitação de notebook — setor Financeiro"_\n3. Selecione a categoria **Solicitação**\n4. Descreva o equipamento necessário e a justificativa\n5. Defina a prioridade como **Baixa** (salvo urgências)\n\n## Informações necessárias\n\n- **Tipo de equipamento** solicitado\n- **Justificativa** de uso\n- **Setor** solicitante\n- **Prazo** necessário\n\n## Aprovação\n\nSolicitações são analisadas pela TI em até **3 dias úteis**. Você receberá atualização pelo sistema.',
'Solicitação', 'equipamento,notebook,computador,solicitar,hardware,periférico', 1);
