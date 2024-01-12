import { type Championship, type Match } from '@prisma/client'
import { prisma } from '../libs/prisma'

type ListChampionshipServiceResult = Array<Championship & { matches: Match[] }>

const listChampionshipService = async (userId: number): Promise<ListChampionshipServiceResult> => {
  const championships = await prisma.championship.findMany({ where: { userId }, include: { matches: true } })
  return championships
}

export { listChampionshipService, type ListChampionshipServiceResult }
