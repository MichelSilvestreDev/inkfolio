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
import { IUserCredentials, IUserData, IUserFormValues } from '../types/auth.types'
import { firebaseAuth } from '../config/firebase/baseConfig'
import { handleSendMail } from './mailService'
import { useDispatch, useSelector } from 'react-redux'
import { changeUser, logout, selectUser } from '../store/auth/authSlice'
import Cookies from 'js-cookie'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useProfile from './useProfile'
import { removeProfile } from '../store/profile/profileSlice'

interface IUserResponse {
  user: User
  token: string
}

const useAuth = () => {
  // Hooks
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { dispatchProfile } = useProfile()
  // States
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const user = useSelector(selectUser)
  const token = Cookies.get('token')

  setPersistence(firebaseAuth, browserLocalPersistence)
  const auth = getAuth()

  const fetchUserData = useCallback(async () => {
    if (!user.uid) {
      setIsLoading(true)
      try {
        await dispathUser()
      } catch (err) {
        console.error(err)
        throw new Error()
      } finally {
        setIsLoading(false)
      }
    }
  }, [user.uid])

  useEffect(() => {
    fetchUserData()
  }, [fetchUserData])

  const dispathUser = async () => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return
      if (!token) return console.error('Usuário não autenticado')

      const userData: IUserData = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        phoneNumber: user.phoneNumber,
        photoUrl: user.photoURL,
        isLogged: true,
      }
      dispatch(changeUser(userData))

      try {
        await dispatchProfile(userData.uid)
      } catch {
        if (user) navigate('/completar-cadastro')
      }
      unsubscribe()
    })
  }

  const userSigIn = async ({
    userEmail,
    userPassword,
  }: IUserCredentials): Promise<IUserResponse> => {
    try {
      const result = await signInWithEmailAndPassword(firebaseAuth, userEmail, userPassword)
      const token = await result.user.getIdToken()
      Cookies.set('token', token, { expires: 7 })

      const userResponse: IUserResponse = {
        user: result.user,
        token: token,
      }
      dispathUser()
      return userResponse
    } catch (err) {
      throw new Error()
    }
  }

  const userSigUp = async ({ email, password }: IUserFormValues): Promise<User> => {
    try {
      const result = await createUserWithEmailAndPassword(firebaseAuth, email, password)
      if (result) {
        handleSendMail('lead_new_user', 'template_vflyum6', '', email)
        handleSendMail('wellcome_user', 'template_ggdcup6', email, '')
      }
      dispathUser()
      return result.user
    } catch (err) {
      console.error(err)
      throw new Error()
    }
  }

  const userSignOut = async () => {
    try {
      await signOut(firebaseAuth)
      navigate('/')
      dispatch(logout())
      dispatch(removeProfile())
      Cookies.remove('token')
    } catch (err) {
      console.error(err)
      throw new Error()
    }
    1
  }

  return {
    user,
    isLoading,
    userSigIn,
    userSigUp,
    userSignOut,
  }
}

export default useAuth
