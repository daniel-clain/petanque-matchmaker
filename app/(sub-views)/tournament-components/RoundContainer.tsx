import { useContext } from 'react'
import { View } from 'react-native'
import { AppContext } from '../../../context/AppContext'
import { RoundNumber } from '../../../types/tournament-types'
import { GameBlock } from './GameBlock'

export function RoundContainer({ roundNumber }: { roundNumber: RoundNumber }) {
  const { activeTournament } = useContext(AppContext)
  const round = activeTournament?.rounds.find(
    (round) => round.roundNumber == roundNumber
  )
  const isDisabled = activeTournament?.activeRoundNumber != roundNumber
  return (
    <View style={{ gap: 10, width: '100%' }}>
      {round?.games.map((game, i) => (
        <GameBlock key={i} game={game} disabled={isDisabled} />
      ))}
    </View>
  )
}
