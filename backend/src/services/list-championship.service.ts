import { type Championship, type Match } from '@prisma/client'
import { prisma } from '../libs/prisma'

type ListChampionshipServiceResult = Array<Championship & { matches: Match[] }>

const listChampionshipService = async (userId: number, page = 1, perPage = 10, order: 'asc' | 'desc' = 'desc'): Promise<ListChampionshipServiceResult> => {
  if (page < 1) {
    page = 1
  }
  if (order !== 'asc' && order !== 'desc') {
    order = 'desc'
  }
  const skip = (page - 1) * perPage
  const take = perPage

  const championships = await prisma.championship.findMany({
    where: {
      userId
    },
    include: {
      matches: {
        include: {
          teamGuest: true,
          teamHome: true
        }
      }
    },
    skip,
    take,
    orderBy: {
      createdAt: order
    }
  })
  return championships
}

export { listChampionshipService, type ListChampionshipServiceResult }
