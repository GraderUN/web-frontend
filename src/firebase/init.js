
import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDrra5mDjJ1dlbdNutY7TMZ5UyFsHHiGX8',
  authDomain: 'authgraderun.firebaseapp.com',
  databaseURL: 'https://authgraderun.firebaseio.com',
  projectId: 'authgraderun',
  storageBucket: 'authgraderun.appspot.com',
  messagingSenderId: '19135027790',
  appId: '1:19135027790:web:5b3e3b391bc3dda590c11f',
  measurementId: 'G-LF58TRFXF1'
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
firebaseApp.firestore().settings({ timestampsInSnapshots: true })

export default firebaseApp.firestore()

