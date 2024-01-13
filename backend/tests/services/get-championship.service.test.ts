import { NotFoundError } from '../../src/errors/not-found.error'
import { prismaMock } from '../../src/libs/prisma.mock'
import { getChampionshipService } from '../../src/services/get-championship.service'

describe('Test Get Championship Service', () => {
  it('should get championship', async () => {
    // arrange
    const id = 1
    const userId = 1
    const winnerId = 1
    const createdAt = new Date()
    prismaMock.championship.findUnique.mockResolvedValue({
      id,
      userId,
      winnerId,
      createdAt
    })

    // act
    const championship = await getChampionshipService(userId, id)

    // assert
    expect(championship.id).toBe(id)
    expect(championship.userId).toBe(userId)
    expect(championship.createdAt).toBe(createdAt)
    expect(championship.winnerId).toBe(winnerId)
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
