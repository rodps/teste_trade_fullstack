import { callPythonScript } from '../utils/call-python-script'
import { InvalidNumberOfTeamsError } from '../errors/invalid-number-of-teams.error'

interface IMatch {
  home: number
  guest: number
  homeScore: number
  guestScore: number
  stage: string
  winner: number
}

interface ISimulatedChampionship {
  matches: IMatch[]
  winner: number
}

const simulateChampionshipService = async (
  teams: number[]
): Promise<ISimulatedChampionship> => {
  if (teams.length !== 8) {
    throw new InvalidNumberOfTeamsError('Teams number should be equal to 8')
  }
  return await simulate(teams)
}

const simulate = async (teams: number[]): Promise<ISimulatedChampionship> => {
  const path = 'test.py'
  const championship: IMatch[] = []
  const goalDifference: Record<number, number> = {}
  for (const team of teams) {
    goalDifference[team] = 0
  }
  while (teams.length >= 2) {
    const winners: number[] = []
    for (let i = 0; i < teams.length; i = i + 2) {
      const home = teams[i]
      const guest = teams[i + 1]
      const matchResult = await callPythonScript(path)
      const parsedResult = matchResult.split('\n')
      const homeScore = Number.parseInt(parsedResult[0])
      const guestScore = Number.parseInt(parsedResult[1])

      goalDifference[home] += homeScore - guestScore
      goalDifference[guest] += guestScore - homeScore

      let winner
      if (homeScore > guestScore) {
        winner = home
      } else if (guestScore > homeScore) {
        winner = guest
      } else {
        if (goalDifference[home] > goalDifference[guest]) {
          winner = home
        } else {
          winner = guest
        }
      }
      winners.push(winner)

      let stage = 'quarters'
      if (teams.length === 4) {
        stage = 'semi'
      } else if (teams.length === 2) {
        stage = 'final'
      }

      championship.push({ home, guest, homeScore, guestScore, stage, winner })
    }
    teams = [...winners]
  }
  return {
    matches: championship,
    winner: teams[0]
  }
}

export { simulateChampionshipService, type IMatch }
