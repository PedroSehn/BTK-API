import express, { Router, Request, Response } from 'express'
import Aluno from '../models/Aluno.js'

const router: Router = express.Router()

router.post('/', async (req: Request, res: Response) => {
  try{
    const id = await Aluno.criar(req.body);
    res.status(201).json({id})
  }catch(err: any){
    res.status(500).json({ erro: err.message})
  }
})

router.delete('/', async (req: Request, res: Response) => {
  try{
   const id = await Aluno.deletar(req.body.id);
   res.status(200).json({id})
  }catch(err: any){
    res.status(500).json({ erro: err.message})
  }
})

router.patch('/:id', async (req: Request, res: Response) => {
  try{
    const id = Number(req.params.id)
    const campos = req.body
    
    if (Object.keys(campos).length === 0) {
      res.status(400).json({ erro: 'Nenhum campo para atualizar' });
    }

    const atualizando = await Aluno.patchAluno(id, campos)
    
    if(!atualizando){
      res.status(404).json({error: 'aluno não encontrado'})
    }

    res.status(200).json({ sucesso: true });
  }catch(err: any){
    res.status(500).json({ erro: err.message})
  }
})

router.put('/:id', async (req: Request, res: Response) => {
  try{
    const aluno = { ...req.body, id: Number(req.params.id) };
    const atualizado = await Aluno.uptadeAluno(aluno);

    if (!atualizado) {
      res.status(404).json({ erro: 'Aluno não encontrado' });
    }

    res.status(200).json({ sucesso: true });
  }catch(err: any){
    res.status(500).json({erro: err.message})
  }
})

router.patch('/alterarStatusPagamento/:id', async (req: Request, res: Response) => {
  try{
    const id = Number(req.params.id)
    const atualizado = await Aluno.alterarStatusPagamento(id, req.body.statusPagamento)

    if (!atualizado) {
      res.status(404).json({ erro: 'Aluno não encontrado' });
    }

    res.status(200).json({ sucesso: true });
  }catch(err: any){
    res.status(500).json({erro: err.message})
  }
})

export default router