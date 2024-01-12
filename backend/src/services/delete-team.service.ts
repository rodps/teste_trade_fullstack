import { prisma } from '../libs/prisma'

const deleteTeamService = async (teamId: number): Promise<void> => {
  await prisma.team.delete({ where: { id: teamId } })
}

export { deleteTeamService }
