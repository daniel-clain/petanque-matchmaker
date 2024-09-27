// firebaseConfig.js
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCPhYvjcX2Gh81OoapGjRhFQATCMYyVlVc',
  authDomain: 'petanque-matchmaker.firebaseapp.com',
  databaseURL:
    'https://petanque-matchmaker-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'petanque-matchmaker',
  storageBucket: 'petanque-matchmaker.appspot.com',
  messagingSenderId: '148183153490',
  appId: '1:148183153490:web:7719582d1d58b26977d88b',
}
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const firestoreDB = getFirestore(app)
const realtimeDB = getDatabase(app)

export { auth, firestoreDB, realtimeDB }
