import { type Match, type Championship } from '@prisma/client'
import { simulateChampionshipService } from './simulate-championship.service'
import { prisma } from '../libs/prisma'

const createChampionshipService = async (userId: number, teams: number[]): Promise<Championship & { matches: Match[] }> => {
  const championship = await simulateChampionshipService(teams)

  return await prisma.championship.create({
    data: {
      createdAt: new Date(),
      userId,
      winnerId: championship.winner,
      matches: {
        createMany: {
          data: championship.matches.map((match) => ({
            stage: match.stage,
            teamGuestGoals: match.guestScore,
            teamGuestId: match.guest,
            teamHomeGoals: match.homeScore,
            teamHomeId: match.home,
            userId
          }))
        }
      }
    },
    include: {
      matches: true
    }
  })
}

export { createChampionshipService }
