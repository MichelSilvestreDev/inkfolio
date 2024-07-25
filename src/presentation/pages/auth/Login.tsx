import { useNavigate } from 'react-router-dom'
import AuthContainer from '../../containers/auth/Auth.container'
import './login.styles.css'
import { useEffect } from 'react'
import useProfile from '../../../services/useProfile'
import useAuth from '../../../services/useAuth'

const Login: React.FC = () => {
  // Hooks
  const navigate = useNavigate()
  const {user, isLoading: fetchingUser} = useAuth()
  const {profile, isLoading: fetchingProfile} = useProfile()

  useEffect(() => {
    /*
    * Redict user to complete your register or to profile page if his profile is complete
    */
    if(user.uid && profile.name === '') {
      if(!fetchingUser && !fetchingProfile) {
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
  }, [profile, fetchingProfile, user.uid, fetchingUser])

  return (
    <div className={`w-full h-screen flex justify-center items-center auth-bg login-page`}>
      <AuthContainer isLogin/>
    </div>
  )
}

export default Login