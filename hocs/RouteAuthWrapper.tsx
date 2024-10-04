import { useRootNavigationState, useRouter } from 'expo-router'
import React, { useContext, useEffect } from 'react'
import { Text } from 'react-native'
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
      return <Text>Loading...</Text>
    }
    return <WrappedComponent {...props} />
  }
}
