import { useRouter } from 'expo-router'
import { signOut } from 'firebase/auth'
import { View } from 'react-native'
import { auth } from '../firebaseConfig'
import { Button_C } from './Button'

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
      <Button_C text="Logout" onPress={handleLogout} />
    </View>
  )
}
