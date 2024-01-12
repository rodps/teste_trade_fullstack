import { prisma } from '../libs/prisma'

const deleteTeamService = async (userId: number, teamId: number): Promise<void> => {
  await prisma.team.delete({ where: { id: teamId, userId } })
}

export { deleteTeamService }
