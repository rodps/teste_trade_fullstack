import { prismaMock } from '../../src/libs/prisma.mock'
import { listChampionshipService } from '../../src/services/list-championship.service'

describe('Test List Championship Service', () => {
  it('should list all championships', async () => {
    // arrange
    prismaMock.championship.findMany.mockResolvedValue([
      {
        id: 1,
        userId: 1,
        createdAt: new Date()
      },
      {
        id: 2,
        userId: 1,
        createdAt: new Date()
      }
    ])

    // act
    const championships = await listChampionshipService(1)

    // assert
    expect(championships.length).toBe(2)
    championships.forEach((c, idx) => {
      expect(c.userId).toBe(1)
      expect(c.id).toBe(idx + 1)
      expect(c.createdAt).toBeDefined()
    })
    expect(prismaMock.championship.findMany).toHaveBeenCalledWith({ where: { userId: 1 }, include: { matches: true } })
  })
})
