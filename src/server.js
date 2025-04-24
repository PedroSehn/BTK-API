import express from 'express';
import alunosRoutes from './routes/alunos_routes.ts';

const app = express();

app.use(express.json());

app.use('/alunos', alunosRoutes)


const PORT = 3000
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})