import { Link, useFocusEffect } from 'expo-router'
import { get, ref } from 'firebase/database'
import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { realtimeDB } from '../firebaseConfig'
import { withPageWrapper } from '../hocs/PageWrapper'
import { withAdminAuth } from '../hocs/RouteAuthWrapper'
import { presetColors } from '../styles/colours'

function LandingPage() {
  const [tournamentStarted, setTournamentStarted] = useState(false)
  useFocusEffect(() => {
    const checkActiveTournament = async () => {
      const tournamentRef = ref(realtimeDB, 'activeTournament')
      const snapshot = await get(tournamentRef)
      if (snapshot.exists()) {
        setTournamentStarted(true)
      } else {
        setTournamentStarted(false)
      }
    }
    checkActiveTournament()
  })
  return (
    <View style={{ gap: 10 }}>
      <Link style={styles.link} href={'(sub-views)/ManagerPlayers'}>
        ManagerPlayers
      </Link>
      <Link style={styles.link} href={'(sub-views)/ActiveTournament'}>
        {tournamentStarted ? 'Active Tournament' : 'Start New Tournament'}
      </Link>
    </View>
  )
}
export default withPageWrapper(withAdminAuth(LandingPage))

const styles = StyleSheet.create({
  link: {
    fontSize: 16,
    paddingVertical: 6,
    paddingHorizontal: 8,
    backgroundColor: presetColors.button.base,
  },
})
