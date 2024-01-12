import { prismaMock } from '../../src/libs/prisma.mock'
import { createChampionshipService } from '../../src/services/create-championship.service'
import { simulateChampionshipService } from '../../src/services/simulate-championship.service'

jest.mock('../../src/services/simulate-championship.service')

const mockedSimulateChampionshipService = jest.mocked(simulateChampionshipService)

describe('Test Create Championship Service', () => {
  it('should create new championship', async () => {
    // arrange
    const userId = 1
    const teams = [1, 2, 3, 4, 5, 6, 7, 8]
    mockedSimulateChampionshipService.mockResolvedValue([])
    prismaMock.championship.create.mockResolvedValue({
      id: 1,
      userId,
      createdAt: new Date()
    })

    // act
    const result = await createChampionshipService(userId, teams)

    // assert
    expect(result.userId).toBe(userId)
    expect(result.id).toBe(1)
  })
})
