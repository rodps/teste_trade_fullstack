import { NotFoundError } from '../../src/errors/not-found.error'
import { prismaMock } from '../../src/libs/prisma.mock'
import { getChampionshipService } from '../../src/services/get-championship.service'

describe('Test Get Championship Service', () => {
  it('should get championship', async () => {
    // arrange
    const id = 1
    const userId = 1
    const createdAt = new Date()
    prismaMock.championship.findUnique.mockResolvedValue({
      id,
      userId,
      firstId: 1,
      secondId: 2,
      thirdId: 3,
      fourthId: 4,
      createdAt
    })

    // act
    const championship = await getChampionshipService(userId, id)

    // assert
    expect(championship.id).toBe(id)
    expect(championship.userId).toBe(userId)
    expect(championship.firstId).toBe(1)
    expect(championship.secondId).toBe(2)
    expect(championship.thirdId).toBe(3)
    expect(championship.fourthId).toBe(4)
    expect(championship.createdAt).toBe(createdAt)
  })

  it('should throw NotFoundError if championship not found', async () => {
    // arrange
    const id = 1
    const userId = 1
    prismaMock.championship.findUnique.mockResolvedValue(null)

    // act
    const promise = getChampionshipService(userId, id)

    // assert
    await expect(promise).rejects.toThrow(NotFoundError)
  })
})
