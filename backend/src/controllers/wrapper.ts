/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type Request, type Response } from 'express'
import { errors } from '../errors'

const wrapper = (controller: (req: Request, res: Response) => Promise<void> | void) => async (req: Request, res: Response) => {
  try {
    await controller(req, res)
  } catch (err) {
    errors(err as Error, res)
  }
}

export { wrapper }
