import { isArray } from 'lodash'
import { Player, Round } from '../types/tournament-types'
import { createNewRound } from './round.service'

describe('createNewRound', () => {
  const mockPreviousRounds: Round[] = []
  const mockPlayers: Player[] = [
    { id: '1', name: 'Player 1' },
    { id: '2', name: 'Player 2' },
    { id: '3', name: 'Player 3' },
    { id: '4', name: 'Player 4' },
    { id: '5', name: 'Player 5' },
  ]
  const testRound = createNewRound(1, mockPreviousRounds, mockPlayers)
  describe('basic scenarios', () => {
    test('should return a round object with an array of games', () => {
      expect(isArray(testRound.games) && testRound.games.length).toBeTruthy()
    })

    test('each game should be made up of 2 teams', () => {
      const everyGameHas2Teams = testRound.games.every(
        (game) => game.teams.length == 2
      )
      expect(everyGameHas2Teams).toBeTruthy()
    })

    test('each team should have 2 or 3 players', () => {
      const everyGameHas2Teams = testRound.games.every((game) =>
        game.teams.every(
          (team) => team.players.length == 2 || team.players.length == 3
        )
      )
      expect(everyGameHas2Teams).toBeTruthy()
    })
  })

  describe('handling previous rounds', () => {
    const mockPreviousRounds: Round[] = [
      {
        roundNumber: 1,
        games: [
          {
            teams: [
              {
                players: [
                  { id: '1', name: 'Player 1' },
                  { id: '2', name: 'Player 2' },
                ],
                points: 0,
              },
              {
                players: [
                  { id: '3', name: 'Player 3' },
                  { id: '4', name: 'Player 4' },
                ],
                points: 0,
              },
            ],
          },
        ],
      },
    ]

    test('should not create the same team combination as previous rounds', () => {
      const testRound = createNewRound(2, mockPreviousRounds, mockPlayers)
      const teamKeys = testRound.games
        .map((game) =>
          game.teams
            .map((team) =>
              team.players
                .map((player) => player.id)
                .sort()
                .join('-')
            )
            .join(',')
        )
        .join(',')
      expect(teamKeys).not.toContain('1-2,3-4')
    })

    test('should create a valid round when some players have already been used', () => {
      const mockRemainingPlayers: Player[] = [
        { id: '5', name: 'Player 5' },
        { id: '6', name: 'Player 6' },
        { id: '7', name: 'Player 7' },
        { id: '8', name: 'Player 8' },
      ]
      const testRound = createNewRound(
        2,
        mockPreviousRounds,
        mockRemainingPlayers
      )
      expect(testRound.games.length).toBeGreaterThan(0)
    })
  })

  describe('handling edge cases', () => {
    test('should handle scenarios where players cannot form complete games', () => {
      const mockPartialPlayers: Player[] = [
        { id: '1', name: 'Player 1' },
        { id: '2', name: 'Player 2' },
        { id: '3', name: 'Player 3' },
      ]
      const testRound = createNewRound(1, [], mockPartialPlayers)
      expect(testRound.games.length).toBe(0) // Not enough players to form a game
    })
  })
})
