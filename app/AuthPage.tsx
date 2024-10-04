import { router } from 'expo-router'
import 'firebase/auth'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { AppContext } from '../context/AppContext'
import { auth } from '../firebaseConfig'
import { Button_C } from '../general-components/Button'
import { withPageWrapper } from '../hocs/PageWrapper'

function AuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [error, setError] = useState('')
  const { user } = useContext(AppContext)

  useEffect(() => {
    console.log('user', user)
    if (user) {
      router.replace('/LandingPage')
    }
  }, [user, router])

  const handleSubmit = async () => {
    setError('')
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password)
      } else {
        await createUserWithEmailAndPassword(auth, email, password)
      }
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{isLogin ? 'Log In' : 'Register'}</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button_C text={isLogin ? 'Log In' : 'Register'} onPress={handleSubmit} />
      <Button_C
        text={isLogin ? 'Switch to Register' : 'Switch to Log In'}
        onPress={() => setIsLogin(!isLogin)}
      />
    </View>
  )
}

export default withPageWrapper(AuthPage)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    gap: 10,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
})
