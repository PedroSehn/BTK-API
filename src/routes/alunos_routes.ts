import { Router, Request, Response } from 'express'
import Aluno from '../models/Aluno.js'

const router = Router()

router.post('/', async (req: Request, res: Response) => {
  try{
    const id = await Aluno.criar(req.body);
    res.status(201).json({id})
  }catch(err: any){
    res.status(500).json({ erro: err.message})
  }
})

export default router