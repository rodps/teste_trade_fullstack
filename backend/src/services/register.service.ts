import { type User } from '@prisma/client'
import { UserAlreadyExistsError } from '../errors/user-already-exists.error'
import { prisma } from '../libs/prisma'
import { hashPassword } from '../libs/hash-password'

interface IRegisterUserData {
  email: string
  password: string
  name: string
}

const registerService = async (data: IRegisterUserData): Promise<User> => {
  const userExists = await prisma.user.findUnique({ where: { email: data.email } })
  if (userExists !== null) {
    throw new UserAlreadyExistsError('User already exists')
  }
  const password = await hashPassword.hash(data.password)
  const user = await prisma.user.create({ data: { ...data, password } })
  return user
}

export { registerService }
