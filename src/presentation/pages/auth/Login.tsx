import { useNavigate } from 'react-router-dom'
import AuthContainer from '../../containers/auth/Auth.container'
import './login.styles.css'
import { useEffect } from 'react'
import useProfile from '../../../services/useProfile'
import useAuth from '../../../services/useAuth'

const Login: React.FC = () => {
  // Hooks
  const navigate = useNavigate()
  const {user, userQuery} = useAuth()
  const {profile, profileQuery} = useProfile()

  useEffect(() => {
    /*
    * Redict user to complete your register or to profile page if his profile is complete
    */
    if(user.uid && profile.name === '') {
      if(!userQuery.isLoading && !profileQuery.isLoading) {
        if(profile.name === ''){
          navigate('/completar-cadastro')
        } else {
          navigate('/perfil')
          }
        }
    } else if(user.uid && profile.name !== '') {
      /*
      * Redirect user to profile page is his alredy complete regiter
      */
      navigate('/perfil')
    }
  }, [profile, profileQuery.isLoading, user.uid, userQuery.isLoading])

  return (
    <div className={`w-full h-screen flex justify-center items-center auth-bg login-page`}>
      <AuthContainer isLogin/>
    </div>
  )
}

export default Login