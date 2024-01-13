/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type Request, type Response } from 'express'
import { listChampionshipService } from '../services/list-championship.service'

const listChampionshipController = async (req: Request, res: Response) => {
  const userId = req.user.id
  const page = Number(req.query.page ?? 1)
  const perPage = Number(req.query.perPage ?? 10)
  const order = req.query.order as 'asc' | 'desc'
  const championships = await listChampionshipService(userId, page, perPage, order)
  res.json(championships)
}

export { listChampionshipController }
