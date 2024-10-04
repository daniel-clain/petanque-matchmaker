import { useFocusEffect } from 'expo-router'
import { orderBy } from 'lodash'
import React, { useContext, useEffect, useState } from 'react'
import { Button, StyleSheet, View } from 'react-native'
import { AppContext } from '../../context/AppContext'
import { ExpandCollapseContainer } from '../../general-components/ExpandCollapseContainer'
import { withPageWrapper } from '../../hocs/PageWrapper'
import { withAdminAuth } from '../../hocs/RouteAuthWrapper'
import { ExistingPlayersList } from './tournament-components/ExistingPlayersList'
import { RoundContainer } from './tournament-components/RoundContainer'
import { StartRoundButton } from './tournament-components/StartRoundButton'
import { TournamentPlayersList } from './tournament-components/TournamentPlayersList'

type RoundNames = 'round 1' | 'round 2' | 'round 3'
function TournamentPage() {
  const { activeTournament, startTournament, deleteTournament } =
    useContext(AppContext)

  const [expandedGroup, setExpandedGroup] = useState<
    'players' | 'options' | RoundNames
  >('players')

  useFocusEffect(() => {
    if (!activeTournament) {
      startTournament()
    }
  })

  useEffect(() => {
    if (activeTournament?.activeRoundNumber) {
      const roundNumberText: RoundNames = `round ${activeTournament.activeRoundNumber}`
      setExpandedGroup(roundNumberText)
    }
  }, [activeTournament?.activeRoundNumber])

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

export default withPageWrapper(withAdminAuth(TournamentPage))
const styles = StyleSheet.create({
  container: { gap: 6 },
  selectPlayersContainer: {
    flexDirection: 'row',
    height: 400,
    width: '100%',
    gap: 4,
  },
})
