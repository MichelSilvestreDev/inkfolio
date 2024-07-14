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
import { changeUser, selectUser } from '../store/auth/authSlice'
import { useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'

interface IUserResponse {
  user: User
  token: string
}

const useAuth = () => {
  const user = useSelector(selectUser)
  const token = Cookies.get('token')
  const dispatch = useDispatch()
  const userQuery = useQuery({
    queryKey: ['user'],
    queryFn: () => dispathUser,
    enabled: !!token,
  })

  setPersistence(firebaseAuth, browserLocalPersistence)
  const auth = getAuth()

  // const fetchUserData = async () => {
  //   console.log('aaaaaaaaaa')
  //   try {
  //     const userData = await getUser()

  //     if(userData) {

  //       return userData
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     throw new Error();
  //   }
  //     .then(async (res) => {
  //       if (token && res) {
  //         const userData: IUserData = {

  //         }
  //         const profileData = await getProfile(user.uid)
  //         if (profileData) {
  //           dispatch(changeProfile(profileData))
  //         } else {
  //           navigate('/completar-cadastro')
  //           dispatch(changeUser(userData))
  //         }
  //       } else {
  //         console.log('Usuário não autenticado.')
  //       }
  //     })
  //     .catch((err) => {
  //       console.error(err)
  //     })
  // }

  const dispathUser = async () => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) throw new Error()

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
      unsubscribe()
    })
  }

  const userSigIn = async ({
    userEmail,
    userPassword,
  }: IUserCredentials): Promise<IUserResponse | boolean> => {
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
      console.error(err)
      return false
    }
  }

  const userSigUp = async ({ email, password }: IUserFormValues): Promise<User | boolean> => {
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
      return false
    }
  }

  const userSignOut = async (): Promise<boolean> => {
    try {
      await signOut(firebaseAuth)
      return true
    } catch (err) {
      console.error(err)
      return false
    }
    1
  }

  return {
    user,
    userQuery,
    userSigIn,
    userSigUp,
    userSignOut,
  }
}

export default useAuth
