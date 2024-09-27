import { useRouter } from 'expo-router'
import { useContext, useState } from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { AppContext } from '../../../context/AppContext'
import { Player } from '../../../types/tournament-types'
import { playerListStyles } from './player-list-styles'

export function ExistingPlayersList() {
  const {
    activeTournament,
    addPlayerToTournament,
    removePlayerFromTournament,
    players,
  } = useContext(AppContext)
  const [playerFilter, setPlayerFilter] = useState('')

  const router = useRouter()
  function tournamentHasPlayer(player: Player) {
    return activeTournament?.players?.some((p) => p.id == player.id)
  }
  return (
    <View style={styles.playerListContainer}>
      <Text style={styles.playerListTitle}>Existing Players</Text>

      <TextInput
        style={styles.input}
        placeholder="search..."
        value={playerFilter}
        onChangeText={setPlayerFilter}
      />
      <FlatList
        data={players
          .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
          .filter(
            ({ name }) =>
              !playerFilter || name.toLowerCase().startsWith(playerFilter)
          )}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              tournamentHasPlayer(item)
                ? removePlayerFromTournament(item)
                : addPlayerToTournament(item)
            }
            style={[
              styles.playerItem,
              {
                backgroundColor: tournamentHasPlayer(item)
                  ? '#e0ffe5'
                  : 'transparent',
              },
            ]}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        style={styles.playerList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  ...playerListStyles,
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  managePlayersButton: {
    backgroundColor: '#c1ecff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  selectedPlayer: {
    backgroundColor: 'lightgreen',
  },
})
