import { StyleSheet } from 'react-native'
export const playerListStyles = StyleSheet.create({
  playerListContainer: {
    flex: 1,
    padding: 6,
    overflow: 'hidden',
    backgroundColor: 'white',
    gap: 6,
  },
  playerListTitle: {
    fontSize: 16,
    marginBottom: 5,
  },
  playerList: {
    flexGrow: 0,
  },
  playerItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
})
