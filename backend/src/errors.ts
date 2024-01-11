/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type Response } from 'express'
import { ApiError } from './errors/api-error'
import { ZodError } from 'zod'

const errors = (err: Error, res: Response) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ error: err.message })
  }
  if (err instanceof ZodError) {
    return res.status(400).json({ error: err })
  }
  res.status(500).json({ error: 'internal server error' })
  console.log(err)
}

export { errors }
