import { onValue, ref, remove, set, update } from 'firebase/database'
import { useEffect, useState } from 'react'
import { realtimeDB } from '../firebaseConfig'
import { Player } from '../types/tournament-types'
import { convertFirebaseListToAppArray } from './firebase-utility.service'

export function usePlayersService() {
  const playersRef = ref(realtimeDB, 'players')
  const [players, setPlayers] = useState<Player[]>([])
  useEffect(() => {
    const unsubscribe = onValue(playersRef, (snapshot) => {
      if (snapshot.exists()) {
        const firebaseData: Record<number, Omit<unknown, 'id'>> = snapshot.val()

        const playersArray = convertFirebaseListToAppArray<Player>(
          firebaseData,
          isPlayer
        )
        setPlayers(playersArray)
      } else {
        console.log('no players')
      }
    })

    // Cleanup the listener when the component unmounts
    return () => unsubscribe()
  }, [])

  const addPlayer = async (playerName: string) => {
    const newPlayerRef = ref(realtimeDB, `players/${Date.now()}`)
    await set(newPlayerRef, { name: playerName })
  }

  const updatePlayer = async (updatedPlayerName: string, playerId: string) => {
    const playerRef = ref(realtimeDB, `players/${playerId}`)
    await update(playerRef, { name: updatedPlayerName })
  }

  const deletePlayer = async (playerId: string) => {
    const playerRef = ref(realtimeDB, `players/${playerId}`)
    await remove(playerRef)
  }

  return {
    players,
    addPlayer,
    updatePlayer,
    deletePlayer,
  }
}

function isPlayer(data: unknown): data is Player {
  const isValid =
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    typeof data.id === 'string' &&
    'name' in data &&
    typeof data.name === 'string'
  if (!isValid) {
    console.error('player data is invalid', data)
  }
  return isValid
}
