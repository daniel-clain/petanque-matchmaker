import { onValue, ref, remove, set } from 'firebase/database'
import { useEffect, useState } from 'react'
import { realtimeDB } from '../firebaseConfig'
import {
  Game,
  Player,
  Round,
  Team,
  Tournament,
} from '../types/tournament-types'
import { createNewRound } from './round.service'

export function useTournamentService() {
  const activeTournamentRef = ref(realtimeDB, 'activeTournament')
  const [activeTournament, setActiveTournament] = useState<
    Tournament | undefined
  >()
  useEffect(() => {
    const unsubscribe = onValue(activeTournamentRef, (snapshot) => {
      if (snapshot.exists()) {
        const existingTournament = snapshot.val() as Tournament
        setActiveTournament(existingTournament)
      } else {
        setActiveTournament(undefined)
      }
    })
    return () => unsubscribe()
  }, [])
  async function startTournament() {
    const newTournament: Tournament = {
      date: new Date().toLocaleDateString(),
      players: [],
      rounds: [],
    }

    try {
      await set(activeTournamentRef, newTournament)
    } catch (error) {
      console.error('Error starting tournament:', error)
    }
  }
  async function deleteTournament() {
    await remove(activeTournamentRef)
  }
  async function addPlayerToTournament(player: Player) {
    if (activeTournament) {
      const updatedPlayers = [...(activeTournament.players ?? []), player]
      await set(activeTournamentRef, {
        ...activeTournament,
        players: updatedPlayers,
      })
    }
  }

  async function removePlayerFromTournament(player: Player) {
    if (activeTournament) {
      const updatedPlayers = activeTournament.players.filter(
        (p) => p.id !== player.id
      )
      await set(activeTournamentRef, {
        ...activeTournament,
        players: updatedPlayers,
      })
    }
  }

  async function startRound() {
    if (activeTournament) {
      const { activeRoundNumber: n } = activeTournament
      const roundNumber = !n ? 1 : n == 1 ? 2 : 3
      console.log('roundNumber', roundNumber)
      const newRound = createNewRound(
        roundNumber,
        activeTournament.rounds ?? [],
        activeTournament.players
      )
      await set(activeTournamentRef, {
        ...activeTournament,
        activeRoundNumber: roundNumber,
        rounds: [...(activeTournament.rounds ?? []), newRound],
      })
    }
  }

  async function setTeamPoints(team: Team, points: number) {
    if (!activeTournament) return
    const { rounds, activeRoundNumber } = activeTournament
    await set(activeTournamentRef, {
      ...activeTournament,
      rounds: rounds.map((round): Round => {
        if (round.roundNumber != activeRoundNumber) return round
        return {
          ...round,
          games: round.games.map((game): Game => {
            if (
              !game.teams.some((t) =>
                t.players.every((p) =>
                  team.players.some((player) => player.name == p.name)
                )
              )
            ) {
              return game
            }

            const [team1, team2] = game.teams
            if (
              team1.players.every((p) =>
                team.players.some((player) => player.name == p.name)
              )
            ) {
              return {
                teams: [{ ...team1, points }, team2],
              }
            } else if (
              team2.players.every((p) =>
                team.players.some((player) => player.name == p.name)
              )
            ) {
              return {
                teams: [team1, { ...team2, points }],
              }
            } else {
              console.error('didnt find team')
              return game
            }
          }),
        }
      }),
    })
  }
  return {
    activeTournament,
    startTournament,
    deleteTournament,
    addPlayerToTournament,
    removePlayerFromTournament,
    startRound,
    setTeamPoints,
  }
}
