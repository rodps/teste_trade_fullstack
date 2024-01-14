/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type Request, type Response } from 'express'
import { getHistoricService } from '../services/get-historic.service'

const getHistoricController = async (req: Request, res: Response) => {
  const userId = req.user.id
  const page = Number(req.query.page ?? 1)
  const perPage = Number(req.query.perPage ?? 10)
  const order = req.query.order as 'asc' | 'desc'
  const historic = await getHistoricService(userId, page, perPage, order)
  res.json(historic)
}

export { getHistoricController }
