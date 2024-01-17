import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { changeUser, logout, selectUser } from "../../store/auth/authSlice"
import { UserData, UserCredentials, UserFormValues } from "../../types/auth.types"
import { GetUserService, SigInService, SigUpService, SignOutService } from "../../services/authService"
import Cookies from 'js-cookie';

export const useAuth = () => {
  // Hooks
  const dispatch = useDispatch()
  // States
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const user = useSelector(selectUser)
  const token = Cookies.get('token')

  // Função assíncrona para buscar os dados do usuário
  const fetchUserData = useCallback(async () => {
    setIsLoading(true)
    if(!user.uid) {
      const res = await GetUserService()
  
      if (token && res) {
        const userData: UserData = {
          uid: res.uid,
          displayName: res.displayName,
          email: res.email,
          emailVerified: res.emailVerified,
          phoneNumber: res.phoneNumber,
          photoUrl: res.photoURL,
          isLogged: true,
        }
        dispatch(changeUser(userData))
        setIsLoading(false)
      } else {
        console.log('Usuário não autenticado.');
        setIsLoading(false)
      }
    }
  }, [dispatch, token, user])

  useEffect(() => {
    fetchUserData()
  }, [fetchUserData])

  const sigIn = async (userCreds: UserCredentials) => {
    setIsLoading(true)

    SigInService(userCreds).then((result) => {
      if(typeof(result) === 'object') {
        const user: UserData = {
          uid: result.user.uid,
          displayName: result.user.displayName,
          email: result.user.email,
          emailVerified: result.user.emailVerified,
          phoneNumber: result.user.phoneNumber,
          photoUrl: result.user.photoURL,
          isLogged: true,
        }
        const token = result.token
        Cookies.set('token', token, { expires: 7 })
        dispatch(changeUser(user))
      } else {
        window.alert('Erro ao logar')
      }
    }).catch((err) => {
      console.error(err)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  const sigUp = async (userCreds: UserFormValues) => {
    setIsLoading(true)

    SigUpService(userCreds).then((result) => {
      if(typeof(result) === 'object') {
        const user: UserData = {
          uid: result.uid,
          displayName: result.displayName,
          email: result.email,
          emailVerified: result.emailVerified,
          phoneNumber: result.phoneNumber,
          photoUrl: result.photoURL,
          isLogged: true,
        }
        dispatch(changeUser(user))
      } else {
        window.alert('Erro ao logar')
      }
    }).catch((err) => {
      console.error(err)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  const signOut = async () => {
    setIsLoading(true)

    SignOutService().then((result) => {
      if(result) {
        dispatch(logout())
        Cookies.remove('token')
      } else {
        window.alert('Erro ao deslogar')
      }
    }).catch((err) => {
      console.error(err)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  return {
    user,
    sigIn,
    sigUp,
    signOut,
    isLoading,
  }
}