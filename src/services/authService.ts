import {
  User,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { UserCredentials, UserFormValues } from '../types/auth.types'
import { firebaseAuth } from '../config/firebase/baseConfig'

type UserResponse = {
  user: User
  token: string
}

setPersistence(firebaseAuth, browserLocalPersistence)
const auth = getAuth()

export const GetUserService = async (): Promise<User | null> => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user)
      } else {
        resolve(null)
      }
      unsubscribe()
    })
  })
}

export const SigInService = async ({
  userEmail,
  userPassword,
}: UserCredentials): Promise<UserResponse | boolean> => {
  try {
    const result = await signInWithEmailAndPassword(firebaseAuth, userEmail, userPassword)
    const token = await result.user.getIdToken()

    const userResponse: UserResponse = {
      user: result.user,
      token: token,
    }
    return userResponse
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
