import { type Championship } from '@prisma/client'
import { prisma } from '../libs/prisma'
import { NotFoundError } from '../errors/not-found.error'

const getChampionshipService = async (userId: number, id: number): Promise<Championship> => {
  const championship = await prisma.championship.findUnique({ where: { userId, id }, include: { matches: { include: { teamGuest: true, teamHome: true } } } })
  if (championship == null) {
    throw new NotFoundError('Championship not found')
  }
  return championship
}

export { getChampionshipService }
