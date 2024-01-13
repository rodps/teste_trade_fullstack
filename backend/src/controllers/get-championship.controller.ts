/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type Request, type Response } from 'express'
import { getChampionshipService } from '../services/get-championship.service'

const getChampionshipController = async (req: Request, res: Response) => {
  const userId = req.user.id
  const id = Number(req.params.id)
  const championship = await getChampionshipService(userId, id)
  res.json({ championship })
}

export { getChampionshipController }
