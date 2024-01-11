import { hashPassword } from '../libs/hash-password'
import { InvalidLoginError } from '../errors/invalid-login.error'
import { prisma } from '../libs/prisma'
import { jwt } from '../libs/jwt'

interface IJwtToken {
  token: string
}

interface ILoginServiceData {
  email: string
  password: string
}

const loginService = async ({ email, password }: ILoginServiceData): Promise<IJwtToken> => {
  const user = await prisma.user.findUnique({ where: { email } })
  if (user === null) {
    throw new InvalidLoginError('Invalid email or password')
  }
  const result = await hashPassword.compare(password, user.password)
  if (!result) {
    throw new InvalidLoginError('Invalid email or password')
  }
  const token = await jwt.sign({ email: user.email })
  return { token }
}

export { loginService, type IJwtToken }
