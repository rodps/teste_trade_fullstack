import { prismaMock } from '../../src/libs/prisma.mock'
import { getHistoricService } from '../../src/services/get-historic.service'

describe('Test Get Championship Historic Service', () => {
  it('should list all championships', async () => {
    // arrange
    prismaMock.championship.findMany.mockResolvedValue([
      {
        id: 1,
        userId: 1,
        firstId: 1,
        secondId: 2,
        thirdId: 3,
        fourthId: 4,
        createdAt: new Date()
      },
      {
        id: 2,
        userId: 1,
        firstId: 1,
        secondId: 2,
        thirdId: 3,
        fourthId: 4,
        createdAt: new Date()
      }
    ])
    prismaMock.championship.count.mockResolvedValue(2)

    // act
    const historic = await getHistoricService(1)

    // assert
    expect(historic.historic.length).toBe(2)
    historic.historic.forEach((c, idx) => {
      expect(c.userId).toBe(1)
      expect(c.id).toBe(idx + 1)
      expect(c.firstId).toBe(1)
      expect(c.secondId).toBe(2)
      expect(c.thirdId).toBe(3)
      expect(c.fourthId).toBe(4)
      expect(c.createdAt).toBeDefined()
    })
    expect(historic.pages).toBe(1)
    expect(historic.totalRecords).toBe(2)
  })
})
