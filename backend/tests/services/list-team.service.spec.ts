import { prismaMock } from '../../src/libs/prisma.mock'
import { listTeamService } from '../../src/services/list-team.service'

describe('Test List Team Service', () => {
  it('should list all teams', async () => {
    // arrange
    prismaMock.team.findMany.mockResolvedValue([
      {
        id: 1,
        name: 'any name',
        userId: 1
      }
    ])

    // act
    const teams = await listTeamService(1)

    // assert
    expect(teams.length).toBe(1)
    expect(teams[0].id).toBe(1)
    expect(teams[0].name).toBe('any name')
    expect(teams[0].userId).toBe(1)
    expect(prismaMock.team.findMany).toHaveBeenCalledWith({ where: { userId: 1 } })
  })
})
