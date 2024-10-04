import { AntDesign } from '@expo/vector-icons'
import React, { useContext, useRef, useState } from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { AppContext } from '../../context/AppContext'
import { Button_C } from '../../general-components/Button'
import { withPageWrapper } from '../../hocs/PageWrapper'
import { withAdminAuth } from '../../hocs/RouteAuthWrapper'

function ManagePlayers() {
  const { players, addPlayer, updatePlayer, deletePlayer } =
    useContext(AppContext)
  const [newPlayer, setNewPlayer] = useState('')
  const [editablePlayerId, setEditablePlayerId] = useState<string | null>(null)
  const [editablePlayerName, setEditablePlayerName] = useState('')
  const [playerFilter, setPlayerFilter] = useState('')
  const newPlayerInputRef = useRef<TextInput>(null)
  const handleAddPlayer = async () => {
    if (newPlayer.trim() === '') return
    await addPlayer(newPlayer.trim())
    setNewPlayer('')
  }

  const startEditing = (player: any) => {
    setEditablePlayerId(player.id)
    setEditablePlayerName(player.name)
  }

  const handleUpdatePlayer = async () => {
    if (editablePlayerName.trim() === '' || !editablePlayerId) return
    await updatePlayer(editablePlayerName.trim(), editablePlayerId)
    setEditablePlayerId(null)
    setEditablePlayerName('')
  }

  return (
    <View style={{ gap: 10 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 10 }}>
        <TextInput
          ref={newPlayerInputRef}
          style={styles.input}
          placeholder="Player Name..."
          value={newPlayer}
          onChangeText={setNewPlayer}
          onSubmitEditing={handleAddPlayer}
          blurOnSubmit={false}
        />
        <Button_C text="Add Player" onPress={handleAddPlayer} />
      </View>

      <TextInput
        ref={newPlayerInputRef}
        style={{ ...styles.input, ...{ alignSelf: 'flex-start' } }}
        placeholder="Search..."
        value={playerFilter}
        onChangeText={setPlayerFilter}
      />

      <ScrollView style={{ maxHeight: 500 }}>
        <FlatList
          style={{ backgroundColor: 'white', padding: 10 }}
          data={players.filter(
            (p) => !playerFilter || p.name.toLowerCase().includes(playerFilter)
          )}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.playerRow}>
              {editablePlayerId === item.id ? (
                <TextInput
                  style={styles.input}
                  value={editablePlayerName}
                  onChangeText={setEditablePlayerName}
                  onBlur={handleUpdatePlayer}
                  autoFocus
                />
              ) : (
                <>
                  <Text style={styles.playerName}>{item.name}</Text>
                  <TouchableOpacity onPress={() => startEditing(item)}>
                    <AntDesign name="edit" size={24} color="black" />
                  </TouchableOpacity>
                </>
              )}
              <TouchableOpacity onPress={() => deletePlayer(item.id)}>
                <AntDesign name="delete" size={24} color="red" />
              </TouchableOpacity>
            </View>
          )}
        />
      </ScrollView>
    </View>
  )
}

export default withPageWrapper(withAdminAuth(ManagePlayers))

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    backgroundColor: 'white',
    maxWidth: 300,
    alignSelf: 'center',
  },
  playerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  playerName: {
    fontSize: 18,
    flex: 1,
  },
})
