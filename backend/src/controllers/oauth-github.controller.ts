/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type Request, type Response } from 'express'
import { z } from 'zod'
import { oauthGithubService } from '../services/oauth-github.service'

const oauthGithubController = async (req: Request, res: Response) => {
  const { code } = z.object({
    code: z.string()
  }).parse(req.query)

  const token = await oauthGithubService(code)
  res.json({ token })
}

export { oauthGithubController }
