import pool from '../db/connection.js';
export default {
    async buscarTodosAlunos() { },
    async buscarAlunoPorId() { },
    async criar(aluno) {
        const { nome, telefone, tipo_plano, valor_plano, status_pagamento } = aluno;
        const res = await pool.query(`INSERT INTO alunos 
      (nome, telefone, tipo_plano, valor_plano, status_pagamento) 
      VALUES ($1, $2, $3, $4, $5) RETURNING id`, [nome, telefone, tipo_plano, valor_plano, status_pagamento]);
    },
    async deletar(id) {
        const res = await pool.query(`DELETE FROM alunos WHERE id = $1 RETURNING id`, [id]);
        console.log(res);
    },
    async patchAluno(id, campos) {
        const chaves = Object.keys(campos);
        const valores = Object.values(campos);
        console.log(id, chaves);
        const setClause = chaves
            .map((chave, index) => `${chave} = $${index + 2}`)
            .join(', ');
        const query = `
    UPDATE alunos
    SET ${setClause}
    WHERE id = $1
    RETURNING id
  `;
        const res = await pool.query(query, [id, ...valores]);
        if (res.rows) {
            return res.rows.length === 1;
        }
        else {
            return false;
        }
    },
    async uptadeAluno(aluno) {
        const { id, nome, telefone, tipo_plano, valor_plano, status_pagamento } = aluno;
        const res = await pool.query(`UPDATE alunos
      SET nome = $2,
          telefone = $3,
          tipo_plano = $4,
          valor_plano = $5,
          status_pagamento = $6
      WHERE id = $1
      RETURNING id`, [id, nome, telefone, tipo_plano, valor_plano, status_pagamento]);
        if (res.rows) {
            return res.rows.length === 1;
        }
        else {
            return false;
        }
    },
    async alterarStatusPagamento(id, statusPagamento) {
        const query = 'UPDATE alunos SET status_pagamento = $2 WHERE id = $1 RETURNING id';
        const res = await pool.query(query, [id, statusPagamento]);
        if (res.rows) {
            return res.rows.length === 1;
        }
        else {
            return false;
        }
    },
};
