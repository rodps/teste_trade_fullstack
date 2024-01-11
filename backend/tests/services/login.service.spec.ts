import { InvalidLoginError } from '../../src/errors/invalid-login.error'
import { prismaMock } from '../../src/libs/prisma.mock'
import { loginService } from '../../src/services/login.service'
import { hashPassword } from '../../src/libs/hash-password'
import { jwt } from '../../src/libs/jwt'

describe('Test Login Service', () => {
  const userMock = {
    email: 'any email',
    password: 'any password',
    id: 1,
    name: 'any name'
  }

  it('should throws InvalidLoginError if user is not found', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null)
    await expect(loginService({ email: 'any', password: 'any' })).rejects.toThrow(InvalidLoginError)
  })

  it('should throws InvalidLoginError if password does not match', async () => {
    prismaMock.user.findUnique.mockResolvedValue(userMock)
    jest.spyOn(hashPassword, 'compare').mockResolvedValue(false)
    await expect(loginService({ email: 'any', password: 'any' })).rejects.toThrow(InvalidLoginError)
  })

  it('should return IJwtToken if user is found and password matches', async () => {
    prismaMock.user.findUnique.mockResolvedValue(userMock)
    jest.spyOn(hashPassword, 'compare').mockResolvedValue(true)
    jest.spyOn(jwt, 'sign').mockResolvedValue('token')
    const result = await loginService({ email: 'any', password: 'any' })
    expect(result).toEqual({ token: 'token' })
  })
})
