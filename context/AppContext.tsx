import React, { createContext, ReactNode } from 'react'
import { useAuthService } from '../services/auth.service'
import { usePlayersService } from '../services/players.service'
import { useTournamentService } from '../services/tournament.service'
import { Player, Team, Tournament } from '../types/tournament-types'

export type AppUser = {
  name: string | undefined
  verified: boolean // no checks yet
}

type ContextType = {
  user: AppUser | null | undefined
  activeTournament: Tournament | undefined
  startTournament: () => void
  deleteTournament: () => void
  addPlayerToTournament: (player: Player) => void
  removePlayerFromTournament: (player: Player) => void
  startRound: () => void
  setTeamPoints: (team: Team, points: number) => void
  players: Player[]
  addPlayer: (playerName: string) => void
  updatePlayer: (playerName: string, playerId: string) => void
  deletePlayer: (playerId: string) => void
}

export const AppContext = createContext<ContextType>({} as ContextType)

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuthService()
  const {
    activeTournament,
    startTournament,
    deleteTournament,
    addPlayerToTournament,
    removePlayerFromTournament,
    startRound,
    setTeamPoints,
  } = useTournamentService()
  const { players, addPlayer, updatePlayer, deletePlayer } = usePlayersService()

  return (
    <AppContext.Provider
      value={{
        user,
        activeTournament,
        startTournament,
        deleteTournament,
        addPlayerToTournament,
        removePlayerFromTournament,
        startRound,
        setTeamPoints,
        players,
        addPlayer,
        updatePlayer,
        deletePlayer,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
