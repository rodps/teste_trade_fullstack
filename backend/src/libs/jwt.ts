import jsonwebtoken from 'jsonwebtoken'
import env from '../config/env'

interface IJwtPayload {
  email: string
  id: number
}

const sign = async (payload: IJwtPayload): Promise<string> => {
  const token = jsonwebtoken.sign(payload, env.jwtSecret, {
    expiresIn: '1d',
    issuer: 'meu-campeonato'
  })

  return token
}

const verify = async (token: string): Promise<IJwtPayload> => {
  return jsonwebtoken.verify(token, env.jwtSecret) as IJwtPayload
}

const jwt = {
  sign,
  verify
}

export { jwt, type IJwtPayload }
