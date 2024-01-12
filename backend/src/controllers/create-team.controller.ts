/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { z } from 'zod'
import { createTeamService } from '../services/create-team.service'
import { type Request, type Response } from 'express'

const createTeamController = async (req: Request, res: Response) => {
  const data = z.object({
    name: z.string().min(3)
  }).parse(req.body)

  const team = await createTeamService(req.user.id, data.name)
  res.status(201).header({ location: `/teams/${team.id}` }).json({ team })
}

export { createTeamController }
