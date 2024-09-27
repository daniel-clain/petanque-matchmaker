import { onAuthStateChanged } from 'firebase/auth'
import { get, ref, set } from 'firebase/database'
import { useEffect, useState } from 'react'
import { AppUser } from '../context/AppContext'
import { auth, realtimeDB } from '../firebaseConfig'

export function useAuthService() {
  const [user, setUser] = useState<AppUser | null | undefined>()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null)
      }
      if (firebaseUser) {
        if (firebaseUser.email == null) {
          throw 'user should have email'
        } else {
          const userRef = ref(realtimeDB, 'users/' + firebaseUser.uid)
          get(userRef)
            .then(async (snapshot) => {
              if (snapshot.exists()) {
                const userData = snapshot.val()
                setUser(userData)
              } else {
                await set(ref(realtimeDB, 'users/' + firebaseUser.uid), {
                  name: '',
                  verified: false,
                })
              }
            })
            .catch((error) => {
              console.error('Error fetching user data:', error)
            })
        }
      }
    })

    return () => unsubscribe()
  }, [])

  return {
    user,
  }
}
