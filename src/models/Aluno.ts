import pool from '../db/connection.js'

export interface IAluno {
  nome: string,
  telefone: string,
}

export default {
  async criar(aluno: IAluno){
    const res = await pool.query(
      'INSERT INTO alunos (nome, telefone) VALUES ($1, $2) RETURNING id', 
      [aluno.nome, aluno.telefone]
    )

    console.log(res)
  }
}