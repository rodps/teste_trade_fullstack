import { InvalidNumberOfTeamsError } from '../../src/errors/invalid-number-of-teams.error'
import { simulateChampionshipService } from '../../src/services/simulate-championship.service'
import { callPythonScript } from '../../src/utils/call-python-script'

jest.mock('../../src/utils/call-python-script')

const mockedCallPythonScript = jest.mocked(callPythonScript)

describe('Test Simulate Championship Service', () => {
  it('should throw InvalidNumberOfTeamsError if teams number is not equal to 8', async () => {
    // arrange
    const teams1 = [1, 2, 3, 4, 5, 6, 7]
    const teams2 = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    // act & assert
    await expect(simulateChampionshipService(teams1)).rejects.toThrow(InvalidNumberOfTeamsError)
    await expect(simulateChampionshipService(teams2)).rejects.toThrow(InvalidNumberOfTeamsError)
  })

  it('should return an array of matches', async () => {
    // arrange
    const teams = [1, 2, 3, 4, 5, 6, 7, 8]
    mockedCallPythonScript.mockResolvedValue('1\n2')

    // act
    const { matches, winner } = await simulateChampionshipService(teams)

    // assert
    expect(matches.length).toBe(7)
    expect(matches[0]).toEqual({
      guest: 2,
      guestScore: 2,
      home: 1,
      homeScore: 1,
      stage: 'quarters'
    })
    expect(winner).toBeDefined()
    expect(mockedCallPythonScript).toHaveBeenCalledTimes(7)
  })
})
