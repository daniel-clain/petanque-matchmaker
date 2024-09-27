// Each player has a name and potentially other attributes like an ID
export type Player = HasId & {
  name: string
}

export type HasId = {
  id: string
}

export type ConvertIDArrayToFirebaseListObject<T extends HasId[]> = {
  [K in T[number]['id']]: Omit<T[number], 'id'>
}
export type ConvertFirebaseListObjectToIDArray<T extends HasId> = T[]

export type Team = {
  players: Player[]
  points: number
}

export type Game = {
  teams: [Team, Team]
}

export type Round = {
  roundNumber: RoundNumber
  games: Game[]
}

export type Tournament = {
  date: string
  players: Player[]
  rounds: Round[]
  activeRoundNumber?: RoundNumber
}
export type RoundNumber = 1 | 2 | 3
