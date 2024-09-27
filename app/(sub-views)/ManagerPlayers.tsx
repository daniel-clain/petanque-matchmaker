import { AntDesign } from '@expo/vector-icons'
import React, { useContext, useRef, useState } from 'react'
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { withAdminAuth } from '../../auth/RouteAuthWrapper'
import { AppContext } from '../../context/AppContext'

const ManagePlayers = () => {
  const { players, addPlayer, updatePlayer, deletePlayer } =
    useContext(AppContext)
  const [newPlayer, setNewPlayer] = useState('')
  const [editablePlayerId, setEditablePlayerId] = useState<string | null>(null)
  const [editablePlayerName, setEditablePlayerName] = useState('')
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
    <View>
      <TextInput
        ref={newPlayerInputRef}
        style={styles.input}
        placeholder="Add new player"
        value={newPlayer}
        onChangeText={setNewPlayer}
        onSubmitEditing={handleAddPlayer}
        blurOnSubmit={false}
      />
      <Button title="Add Player" onPress={handleAddPlayer} />

      <FlatList
        data={players}
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
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
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

export default withAdminAuth(ManagePlayers)
