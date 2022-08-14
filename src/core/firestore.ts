import { initializeApp } from "firebase/app"
import { getFirestore, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore"

const API_KEY = process.env.REACT_APP_API_KEY
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "study-1038b.firebaseapp.com",
  projectId: "study-1038b",
  storageBucket: "study-1038b.appspot.com",
  messagingSenderId: "832167009445",
  appId: "1:832167009445:web:658d090b6e2b502062414c"
}


export const app = initializeApp(firebaseConfig)

export const fireStore = getFirestore(app)

/** Firestore 문서와 코드쪽 도메인 모델을 변환 */
export function getDefaultConverter<T> () {
  return {
    toFirestore (_: T) {
      return _
    },
    fromFirestore (
      snapshot: QueryDocumentSnapshot<T>,
      options: SnapshotOptions,
    ): T {
      return snapshot.data(options)!
    },
  }
}