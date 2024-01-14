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
    mockedSimulateChampionshipService.mockResolvedValue({
      matches: [],
      first: 1,
      second: 2,
      third: 3,
      fourth: 4
    })
    prismaMock.championship.create.mockResolvedValue({
      id: 1,
      firstId: 1,
      secondId: 2,
      thirdId: 3,
      fourthId: 4,
      userId,
      createdAt: new Date()
    })

    // act
    const result = await createChampionshipService(userId, teams)

    // assert
    expect(result.userId).toBe(userId)
    expect(result.id).toBe(1)
    expect(result.firstId).toBe(1)
    expect(result.secondId).toBe(2)
    expect(result.thirdId).toBe(3)
    expect(result.fourthId).toBe(4)
  })
})
