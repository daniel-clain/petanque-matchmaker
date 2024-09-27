import { useRouter } from 'expo-router'
import { signOut } from 'firebase/auth'
import { Button, View } from 'react-native'
import { auth } from '../firebaseConfig'

export const LogoutButton = () => {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await signOut(auth)
      console.log('User signed out successfully')
      router.push('/AuthPage')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <View style={{ marginRight: 10 }}>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  )
}
