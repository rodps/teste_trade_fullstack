/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { z } from 'zod'
import { registerService } from '../services/register.service'
import { type Request, type Response } from 'express'

const registerController = async (req: Request, res: Response) => {
  const data = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(3)
  }).parse(req.body)

  const user = await registerService(data)
  res.status(201).header({
    location: `/users/${user.id}`
  }).json({ user })
}

export { registerController }
