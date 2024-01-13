import { type Championship, type Match } from '@prisma/client'
import { prisma } from '../libs/prisma'

interface IListChampionshipServiceResult {
  championships: Array<Championship & { matches: Match[] }>
  pages: number
}

const listChampionshipService = async (
  userId: number,
  page = 1,
  perPage = 10,
  order: 'asc' | 'desc' = 'desc'
): Promise<IListChampionshipServiceResult> => {
  if (page < 1) {
    page = 1
  }
  if (order !== 'asc' && order !== 'desc') {
    order = 'desc'
  }
  const skip = (page - 1) * perPage
  const take = perPage ?? 10

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

  const championshipsCount = await prisma.championship.count({})
  const totalPages = Math.ceil(championshipsCount / perPage)
  return { championships, pages: totalPages }
}

export { listChampionshipService, type IListChampionshipServiceResult }
