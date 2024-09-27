import { useRootNavigationState, useRouter } from 'expo-router'
import React, { useContext, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AppContext } from '../context/AppContext'

export const withAdminAuth = (WrappedComponent: React.ComponentType) => {
  return function AuthenticatedComponent(props: any) {
    const { user } = useContext(AppContext)
    const router = useRouter()

    const resultState = useRootNavigationState()

    useEffect(() => {
      if (resultState.routeNames) {
        if (user === null) {
          router.replace('/AuthPage')
        }
      }
    }, [user, router, resultState.routeNames])

    if (user === undefined) {
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <WrappedComponent {...props} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
})
