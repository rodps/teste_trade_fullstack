/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type Request, type Response } from 'express'
import { createChampionshipService } from '../services/create-championship.service'
import { z } from 'zod'

const simulateChampionshipController = async (req: Request, res: Response) => {
  const { teams } = z.object({
    teams: z.array(z.number()).length(8)
  }).parse(req.body)

  const userId = req.user.id
  const championship = await createChampionshipService(userId, teams)
  res.json({ championship })
}

export { simulateChampionshipController }
