import { NotFoundError } from '../../src/errors/not-found.error'
import { prismaMock } from '../../src/libs/prisma.mock'
import { getChampionshipService } from '../../src/services/get-championship.service'

describe('Test Get Championship Service', () => {
  it('should get championship', async () => {
    // arrange
    const id = 1
    prismaMock.championship.findUnique.mockResolvedValue({
      id,
      userId: 1,
      createdAt: new Date()
    })

    // act
    const championship = await getChampionshipService(id)

    // assert
    expect(championship.id).toBe(id)
    expect(championship.userId).toBe(1)
    expect(championship.createdAt).toBeDefined()
  })

  it('should throw NotFoundError if championship not found', async () => {
    // arrange
    const id = 1
    prismaMock.championship.findUnique.mockResolvedValue(null)

    // act
    const promise = getChampionshipService(id)

    // assert
    await expect(promise).rejects.toThrow(NotFoundError)
  })
})
