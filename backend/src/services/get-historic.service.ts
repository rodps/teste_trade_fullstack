import { type Championship, type Team } from '@prisma/client'
import { prisma } from '../libs/prisma'

interface IGetHistoricResult {
  historic: Array<
  Championship & { first: Team, second: Team, third: Team, fourth: Team }
  >
  pages: number
  totalRecords: number
}

const getHistoricService = async (
  userId: number,
  page = 1,
  perPage = 10,
  order: 'asc' | 'desc' = 'desc'
): Promise<IGetHistoricResult> => {
  if (page < 1) {
    page = 1
  }
  if (order !== 'asc' && order !== 'desc') {
    order = 'desc'
  }
  const skip = (page - 1) * perPage
  const take = perPage ?? 10
  const historic = await prisma.championship.findMany({
    where: {
      userId
    },
    include: { first: true, second: true, third: true, fourth: true },
    orderBy: { createdAt: order },
    skip,
    take
  })
  const championshipsCount = await prisma.championship.count({})
  const totalPages = Math.ceil(championshipsCount / perPage)
  return { historic, pages: totalPages, totalRecords: championshipsCount }
}

export { getHistoricService }
