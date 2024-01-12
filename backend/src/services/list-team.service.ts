import { type Team } from '@prisma/client'
import { prisma } from '../libs/prisma'

const listTeamService = async (userId: number): Promise<Team[]> => {
  const teams = await prisma.team.findMany({ where: { userId } })
  return teams
}

export { listTeamService }
