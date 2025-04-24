"use strict";
import pool from '../db/connection.js';
export default {
    async criar(aluno) {
        const res = await pool.query('INSERT INTO alunos (nome, telefone) VALUES ($1, $2) RETURNING id', [aluno.nome, aluno.telefone]);
        console.log(res);
    }
};
