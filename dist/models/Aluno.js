import pool from '../db/connection.js';
export default {
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
        console.log(setClause);
        const res = await pool.query(query, [id, ...valores]);
        if (res.rows) {
            return res.rows.length === 1;
        }
        else {
            return false;
        }
    },
    async uptadeAluno() { },
    async alterarStatusPagamento() { },
};
