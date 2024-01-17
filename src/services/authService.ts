import {
  User,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { UserCredentials } from '../types/auth.types'
import { firebaseAuth } from '../config/firebase/baseConfig'

setPersistence(firebaseAuth, browserLocalPersistence)

export const SigInService = async ({
  userEmail,
  userPassword,
}: UserCredentials): Promise<User | boolean> => {
  try {
    const result = await signInWithEmailAndPassword(firebaseAuth, userEmail, userPassword)
    console.log(result)
    return result.user
  } catch (err) {
    console.error(err)
    return false
  }
}

export const SigUpService = async ({
  userEmail,
  userPassword,
}: UserCredentials): Promise<boolean> => {
  try {
    const result = await createUserWithEmailAndPassword(firebaseAuth, userEmail, userPassword)
    console.log(result)
    return true
  } catch (err) {
    console.error(err)
    return false
  }
}

export const SignOutService = async (): Promise<boolean> => {
  try {
    const result = await signOut(firebaseAuth)
    console.log(result)
    return true
  } catch (err) {
    console.error(err)
    return false
  }
}
