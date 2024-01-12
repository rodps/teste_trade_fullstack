import { prismaMock } from '../../src/libs/prisma.mock'
import { createTeamService } from '../../src/services/create-team.service'

describe('Test Create Team Service', () => {
  it('should create new team', async () => {
    // arrange
    prismaMock.team.create.mockResolvedValue({
      id: 1,
      name: 'any name',
      userId: 1
    })

    // act
    const team = await createTeamService(1, 'any name')

    // assert
    expect(team.id).toBe(1)
    expect(team.userId).toBe(1)
    expect(team.name).toBe('any name')
    expect(prismaMock.team.create).toHaveBeenCalledWith({ data: { name: 'any name', userId: 1 } })
  })
})
