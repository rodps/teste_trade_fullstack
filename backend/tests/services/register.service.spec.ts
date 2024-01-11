import { UserAlreadyExistsError } from '../../src/errors/user-already-exists.error'
import { hashPassword } from '../../src/libs/hash-password'
import { prismaMock } from '../../src/libs/prisma.mock'
import { registerService } from '../../src/services/register.service'

describe('Test Register Service', () => {
  const userMock = {
    email: 'any email',
    password: 'any password',
    id: 1,
    name: 'any name'
  }

  it('should register user', async () => {
    // arrange
    prismaMock.user.findUnique.mockResolvedValue(null)
    prismaMock.user.create.mockResolvedValue(userMock)
    jest.spyOn(hashPassword, 'hash').mockResolvedValue('hashedPassword')

    // act
    const { email, password, name } = userMock
    const user = await registerService({ email, password, name })

    // assert
    expect(user.name).toBe(name)
    expect(user.email).toBe(email)
    expect(user.password).toBe(password)
    expect(prismaMock.user.create).toHaveBeenCalledWith({ data: { email, name, password: 'hashedPassword' } })
  })

  it('should throw UserAlreadyExistsError if user already exists', async () => {
    // arrange
    prismaMock.user.findUnique.mockResolvedValue(userMock)

    // act & assert
    const { email, password, name } = userMock
    await expect(registerService({ email, password, name })).rejects.toThrow(UserAlreadyExistsError)
  })
})
