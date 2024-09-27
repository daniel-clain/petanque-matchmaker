import { useContext } from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import { AppContext } from '../../../context/AppContext'

export function StartRoundButton() {
  const { activeTournament, startRound } = useContext(AppContext)

  function getNextRoundNumber() {
    const { rounds } = activeTournament!
    return !rounds?.length
      ? 1
      : rounds.length == 1
      ? 2
      : rounds.length == 2
      ? 3
      : undefined
  }
  const nextRoundNumber = getNextRoundNumber()
  if (!nextRoundNumber) return null
  const disabled =
    !activeTournament?.players?.length ||
    activeTournament.players.length < 4 ||
    (activeTournament.activeRoundNumber == 1 &&
      !activeTournament.rounds[0].games.every((game) =>
        game.teams.some((team) => team.points == 13)
      )) ||
    (activeTournament.activeRoundNumber == 2 &&
      !activeTournament.rounds[1].games.every((game) =>
        game.teams.some((team) => team.points == 13)
      ))
  return (
    <Pressable
      disabled={disabled}
      style={[styles.button, disabled ? { backgroundColor: '#d6d6d6' } : {}]}
      onPress={() => startRound()}
    >
      <Text style={styles.buttonText}>Start Round {nextRoundNumber}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 4,
    borderWidth: 1,
    backgroundColor: '#e0ffe5',
    alignSelf: 'flex-start',
  },
  buttonText: {
    fontSize: 16,
  },
})
