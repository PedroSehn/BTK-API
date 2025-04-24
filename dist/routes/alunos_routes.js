"use strict";
import { Router } from 'express';
import Aluno from '../models/Aluno.js';
const router = Router();
router.post('/', async (req, res) => {
    try {
        const id = await Aluno.criar(req.body);
        res.status(201).json({ id });
    }
    catch (err) {
        res.status(500).json({ erro: err.message });
    }
});
export default router;
