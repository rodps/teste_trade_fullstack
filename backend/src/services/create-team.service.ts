import { type Team } from '@prisma/client'
import { prisma } from '../libs/prisma'

const createTeamService = async (userId: number, name: string): Promise<Team> => {
  const team = await prisma.team.create({ data: { name, userId } })
  return team
}

export { createTeamService }
