import {} from 'lodash'
import { useContext } from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { AppContext } from '../../../context/AppContext'
import { playerListStyles } from './player-list-styles'

export function TournamentPlayersList() {
  const { activeTournament, removePlayerFromTournament } =
    useContext(AppContext)
  return (
    <View style={styles.playerListContainer}>
      <Text style={styles.playerListTitle}>Tournament Players</Text>
      <FlatList
        data={activeTournament?.players?.reverse()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => removePlayerFromTournament(item)}
            style={styles.playerItem}
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
})
