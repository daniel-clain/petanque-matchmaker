import { useFocusEffect } from 'expo-router'
import { orderBy } from 'lodash'
import React, { useContext, useState } from 'react'
import { Button, StyleSheet, View } from 'react-native'
import { withAdminAuth } from '../../auth/RouteAuthWrapper'
import { AppContext } from '../../context/AppContext'
import { ExpandCollapseContainer } from '../../general-components/ExpandCollapseContainer'
import { ExistingPlayersList } from './tournament-components/ExistingPlayersList'
import { RoundContainer } from './tournament-components/RoundContainer'
import { StartRoundButton } from './tournament-components/StartRoundButton'
import { TournamentPlayersList } from './tournament-components/TournamentPlayersList'
const TournamentPage = () => {
  const { activeTournament, startTournament, deleteTournament } =
    useContext(AppContext)

  const [expandedGroup, setExpandedGroup] = useState<
    'players' | 'options' | 'round 1' | 'round 2' | 'round 3'
  >()

  useFocusEffect(() => {
    if (!activeTournament) {
      startTournament()
    }
  })

  if (!activeTournament) return null
  return (
    <View style={styles.container}>
      <StartRoundButton />
      {orderBy(activeTournament.rounds, 'roundNumber', 'desc').map((round) => (
        <ExpandCollapseContainer
          key={round.roundNumber}
          title={`Round ${round.roundNumber}`}
          onExpanded={() =>
            setExpandedGroup(
              `round ${round.roundNumber}` as 'round 1' | 'round 2' | 'round 3'
            )
          }
          expanded={
            expandedGroup ==
            (`round ${round.roundNumber}` as 'round 1' | 'round 2' | 'round 3')
          }
        >
          <RoundContainer roundNumber={round.roundNumber} />
        </ExpandCollapseContainer>
      ))}
      <ExpandCollapseContainer
        title="Players"
        onExpanded={() => setExpandedGroup('players')}
        expanded={expandedGroup == 'players'}
      >
        <View style={styles.selectPlayersContainer}>
          <TournamentPlayersList />
          <ExistingPlayersList />
        </View>
      </ExpandCollapseContainer>

      <ExpandCollapseContainer
        title="Options"
        onExpanded={() => setExpandedGroup('options')}
        expanded={expandedGroup == 'options'}
      >
        <Button onPress={deleteTournament} title="Delete" />
      </ExpandCollapseContainer>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { gap: 6 },
  selectPlayersContainer: {
    flexDirection: 'row',
    height: 400,
    gap: 4,
  },
})
export default withAdminAuth(TournamentPage)
