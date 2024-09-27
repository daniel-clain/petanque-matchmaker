import { router, useRootNavigationState } from 'expo-router'
import React, { useContext, useEffect } from 'react'
import { Text, View } from 'react-native'
import { AppContext } from '../context/AppContext'

const Index = () => {
  const { user } = useContext(AppContext)
  const { routeNames } = useRootNavigationState()
  useEffect(() => {
    if (routeNames) {
      if (user === null) {
        router.replace('/AuthPage')
      } else {
        router.replace('/LandingPage')
      }
    }
  }, [user, router, routeNames])
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  )
}
export default Index
