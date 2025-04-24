CREATE TABLE alunos (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  telefone VARCHAR(20) NOT NULL,
  tipo_plano VARCHAR(10) CHECK (tipo_plano IN ('mensal', 'trimestral', 'semestral', 'anual')),
  valor_plano DECIMAL(10, 2) NOT NULL,
  status_pagamento VARCHAR(8) CHECK (status_pagamento IN ('pago', 'pendente')),
  data_cadastro TIMESTAMP DEFAULT NOW()
);