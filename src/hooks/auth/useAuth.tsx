import { useState } from "react"
import { useDispatch } from "react-redux"
import { changeUser, logout } from "../../store/auth/authSlice"
import { User, UserCredentials, UserFormValues } from "../../types/auth.types"
import { SigInService, SigUpService, SignOutService } from "../../services/authService"

export const useAuth = () => {
  // Hooks
  const dispatch = useDispatch()
  // States
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const sigIn = async (userCreds: UserCredentials) => {
    setIsLoading(true)

    SigInService(userCreds).then((result) => {
      if(typeof(result) === 'object') {
        const user: User = {
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

  const sigUp = async (userCreds: UserFormValues) => {
    setIsLoading(true)

    SigUpService(userCreds).then((result) => {
      if(typeof(result) === 'object') {
        const user: User = {
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
    sigIn,
    sigUp,
    signOut,
    isLoading,
    setIsLoading
  }
}