/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type Request, type Response } from 'express'
import { listTeamService } from '../services/list-team.service'

const listTeamController = async (req: Request, res: Response) => {
  const userId = req.user.id
  const teams = await listTeamService(userId)
  res.json({ teams })
}

export { listTeamController }
