import { initializeApp } from "firebase/app"

import {
  getAuth
} from "firebase/auth"

import {
  getFirestore
} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAHkcvWH_pnWPt9SJvFFNeWZ6U5hsXN8LU",
  authDomain: "langmate-8b04b.firebaseapp.com",
  projectId: "langmate-8b04b",
  storageBucket: "langmate-8b04b.firebasestorage.app",
  messagingSenderId: "415740125992",
  appId: "1:415740125992:web:4e291cb4379ee6f258661d",
  measurementId: "G-XPZ7F2HM12"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

export const db = getFirestore(app)