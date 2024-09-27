import React, { Fragment, useContext } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { AppContext } from '../../../context/AppContext'
import { Game, Team } from '../../../types/tournament-types'

type Props = {
  game: Game
  disabled: boolean
}
export function GameBlock({ game, disabled }: Props) {
  const { setTeamPoints } = useContext(AppContext)
  function handlePointsChange(team: Team, pointsString: string) {
    const points = Number(pointsString)
    if (isNaN(points) || points > 13 || points < 0) return
    setTeamPoints(team, points)
  }
  return (
    <View
      style={[
        styles.gameContainer,
        game.teams.some((team) => team.points == 13)
          ? { backgroundColor: '#e0ffe5' }
          : {},
      ]}
    >
      {game.teams.map((team, i) => (
        <Fragment key={i}>
          <View style={styles.teamRow}>
            <View>
              {team.players.map((player) => (
                <Text key={player.id}>{player.name}</Text>
              ))}
            </View>
            <View style={styles.points}>
              <Text>Points: </Text>
              {disabled ? (
                <View style={styles.input}>
                  <Text>{team.points.toString()}</Text>
                </View>
              ) : (
                <TextInput
                  style={styles.input}
                  value={team.points.toString()}
                  onChangeText={(text) => handlePointsChange(team, text)}
                />
              )}
            </View>
          </View>
          {!i && <View style={styles.separator} />}
        </Fragment>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  gameContainer: {
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderBlockColor: 'black',
    backgroundColor: '#d4e7f3',
    gap: 10,
  },
  teamRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  points: {
    alignSelf: 'flex-end',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 4,
    backgroundColor: 'white',
    width: 60,
  },
  separator: {
    height: 1,
    backgroundColor: 'black',
  },
})
