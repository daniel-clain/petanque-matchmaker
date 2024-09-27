import {
  Stack,
  useFocusEffect,
  useNavigation,
  usePathname,
  useRouter,
} from 'expo-router'
import React from 'react'
import { AppProvider } from '../context/AppContext'
import { LogoutButton } from '../general-components/LogoutButton'

export default function App() {
  const router = useRouter()
  const navigation = useNavigation()
  const pathname = usePathname()

  useFocusEffect(() => {
    if (!navigation.canGoBack() && pathname !== '/LandingPage') {
      router.replace('/LandingPage')
      router.push(pathname)
    }
  })
  return (
    <AppProvider>
      <Stack initialRouteName="LandingPage">
        <Stack.Screen name="AuthPage" options={{ headerShown: false }} />
        <Stack.Screen
          name="LandingPage"
          options={{
            title: 'Pétanque Matchmaker',
            headerRight: () => <LogoutButton />,
          }}
        />
        <Stack.Screen
          name="(sub-views)/ManagerPlayers"
          options={{
            title: 'Manage Players',
            headerRight: () => <LogoutButton />,
          }}
        />
        <Stack.Screen
          name="(sub-views)/ActiveTournament"
          options={{
            title: 'Active Tournament',
            headerRight: () => <LogoutButton />,
          }}
        />
      </Stack>
    </AppProvider>
  )
}
