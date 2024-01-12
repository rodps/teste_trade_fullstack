import { prismaMock } from '../../src/libs/prisma.mock'
import { deleteTeamService } from '../../src/services/delete-team.service'

describe('Test Delete Team Service', () => {
  it('should delete team', async () => {
    // act
    const teamId = 1
    await deleteTeamService(teamId)

    // assert
    expect(prismaMock.team.delete).toHaveBeenCalledWith({ where: { id: teamId } })
  })
})
