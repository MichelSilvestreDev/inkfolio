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
import { IUserCredentials, IUserFormValues } from '../types/auth.types'
import { firebaseAuth } from '../config/firebase/baseConfig'
import { handleSendMail } from './mailService'

interface IUserResponse {
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
}: IUserCredentials): Promise<IUserResponse | boolean> => {
  try {
    const result = await signInWithEmailAndPassword(firebaseAuth, userEmail, userPassword)
    const token = await result.user.getIdToken()

    const userResponse: IUserResponse = {
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
}: IUserFormValues): Promise<User | boolean> => {
  try {
    const result = await createUserWithEmailAndPassword(firebaseAuth, email, password)
    if (result) {
      handleSendMail('lead_new_user', 'template_vflyum6', '', email)
      handleSendMail('wellcome_user', 'template_ggdcup6', email, '')
    }
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
