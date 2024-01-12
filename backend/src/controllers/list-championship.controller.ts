/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type Request, type Response } from 'express'
import { listChampionshipService } from '../services/list-championship.service'

const listChampionshipController = async (req: Request, res: Response) => {
  const userId = req.user.id
  const championships = await listChampionshipService(userId)
  res.json({ championships })
}

export { listChampionshipController }
