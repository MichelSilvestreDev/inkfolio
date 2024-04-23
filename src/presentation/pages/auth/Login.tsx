import { useNavigate } from 'react-router-dom'
import AuthContainer from '../../containers/auth/Auth.container'
import './login.styles.css'
import { useAuth } from '../../../hooks/auth/useAuth'
import useProfile from '../../../hooks/profile/useProfile'
import { useEffect } from 'react'

const Login: React.FC = () => {
  // Hooks
  const navigate = useNavigate()
  const {user} = useAuth()
  const {profile, getUserProfile} = useProfile()

  useEffect(() => {
    /*
    * Redict user to complete your register or to profile page if his profile is complete
    */
    if(user.uid && profile.name === '') {
      (async () => {
        const profileData = await getUserProfile(user.uid)
        if(profileData.name === ''){
          navigate('/completar-cadastro')
        } else {
          navigate('/perfil')
        }
      })()
    } else if(user.uid && profile.name !== '') {
      /*
      * Redirect user to profile page is his alredy complete regiter
      */
      navigate('/perfil')
    }
  }, [profile, user.uid])

  return (
    <div className={`w-full h-screen flex justify-center items-center auth-bg login-page`}>
      <AuthContainer isLogin/>
    </div>
  )
}

export default Login