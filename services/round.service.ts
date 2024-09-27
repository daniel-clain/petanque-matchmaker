import { Game, Player, Round, RoundNumber } from '../types/tournament-types'

function shuffleArray<T>(array: T[]): T[] {
  return array.sort(() => Math.random() - 0.5)
}

export function createNewRound(
  roundNumber: RoundNumber,
  previousRounds: Round[],
  players: Player[]
): Round {
  const round: Round = { roundNumber, games: [] }

  const availablePlayers = [...players]
  console.log('availablePlayers', availablePlayers)

  // Group players into teams of 2, ensuring we respect team limits and previous formations
  while (availablePlayers.length >= 4) {
    const team1 = shuffleArray(availablePlayers).slice(0, 2)
    availablePlayers.splice(0, 2) // Remove selected players

    const team2 = shuffleArray(availablePlayers).slice(0, 2)
    availablePlayers.splice(0, 2) // Remove selected players

    const game: Game = {
      teams: [
        { players: team1, points: 0 },
        { players: team2, points: 0 },
      ],
    }
    console.log('pushing game', game)
    round.games.push(game)
  }

  // Distribute any remaining players into existing teams (max 3 per team)
  availablePlayers.forEach((player) => {
    const teamWithSpace = round.games.find((game) =>
      game.teams.some((team) => team.players.length < 3)
    )

    if (teamWithSpace) {
      const team = teamWithSpace.teams.find((t) => t.players.length < 3)
      console.log(`adding ${player.name} to: `, team)
      team?.players.push(player)
    }
  })
  console.log('round', round)
  return round
}
