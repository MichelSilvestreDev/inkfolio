import {
  User,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { UserCredentials, UserFormValues } from '../types/auth.types'
import { firebaseAuth } from '../config/firebase/baseConfig'

setPersistence(firebaseAuth, browserLocalPersistence)

export const SigInService = async ({
  userEmail,
  userPassword,
}: UserCredentials): Promise<User | boolean> => {
  try {
    const result = await signInWithEmailAndPassword(firebaseAuth, userEmail, userPassword)
    return result.user
  } catch (err) {
    console.error(err)
    return false
  }
}

export const SigUpService = async ({
  email,
  password,
}: UserFormValues): Promise<User | boolean> => {
  try {
    const result = await createUserWithEmailAndPassword(firebaseAuth, email, password)
    console.log(result)
    return result.user
  } catch (err) {
    console.error(err)
    return false
  }
}

export const SignOutService = async (): Promise<boolean> => {
  try {
    await signOut(firebaseAuth)
    return true
  } catch (err) {
    console.error(err)
    return false
  }
}
