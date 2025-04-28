import express from 'express';
import Aluno from '../models/Aluno.js';
const router = express.Router();
router.post('/', async (req, res) => {
    try {
        const id = await Aluno.criar(req.body);
        res.status(201).json({ id });
    }
    catch (err) {
        res.status(500).json({ erro: err.message });
    }
});
router.delete('/', async (req, res) => {
    try {
        const id = await Aluno.deletar(req.body.id);
        res.status(200).json({ id });
    }
    catch (err) {
        res.status(500).json({ erro: err.message });
    }
});
router.patch('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const campos = req.body;
        if (Object.keys(campos).length === 0) {
            res.status(400).json({ erro: 'Nenhum campo para atualizar' });
        }
        const atualizando = await Aluno.patchAluno(id, campos);
        if (!atualizando) {
            res.status(404).json({ error: 'aluno não encontrado' });
        }
        res.status(200).json({ sucesso: true });
    }
    catch (err) {
        res.status(500).json({ erro: err.message });
    }
});
export default router;
