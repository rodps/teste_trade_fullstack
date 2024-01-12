/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextFunction, type Request, type Response } from 'express'
import { jwt } from '../libs/jwt'

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = extractTokenFromHeader(req)
  if (token == null) {
    return res.status(401).json({ error: 'Bearer token not found' })
  }
  try {
    const payload = await jwt.verify(token)
    req.user = payload
    next()
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
}

const extractTokenFromHeader = (req: Request) => {
  const authorizationHeader = req.headers.authorization

  if (authorizationHeader != null) {
    const tokenArray = authorizationHeader.split(' ')
    if (tokenArray.length === 2 && tokenArray[0] === 'Bearer') {
      const bearerToken = tokenArray[1]
      return bearerToken
    }
  }
  return null
}

export { authMiddleware }
