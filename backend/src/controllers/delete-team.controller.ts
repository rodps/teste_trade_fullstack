/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type Request, type Response } from 'express'
import { deleteTeamService } from '../services/delete-team.service'

const deleteTeamController = async (req: Request, res: Response) => {
  const teamId = Number(req.params.id)
  const userId = req.user.id
  await deleteTeamService(userId, teamId)
  res.status(204).send()
}

export { deleteTeamController }
