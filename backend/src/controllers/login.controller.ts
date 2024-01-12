/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type Request, type Response } from 'express'
import { loginService } from '../services/login.service'
import { z } from 'zod'

const loginController = async (req: Request, res: Response) => {
  const data = z.object({
    email: z.string(),
    password: z.string()
  }).parse(req.body)

  const token = await loginService(data)
  res.json({ token })
}

export { loginController }
