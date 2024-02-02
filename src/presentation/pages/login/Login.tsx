import AuthContainer from "../../containers/auth/Auth.container"
import './login.styles.css'

const Login: React.FC = () => {
  return (
    <div className={`w-full h-screen flex justify-center items-center auth-bg login-page`}>
      <AuthContainer />
    </div>
  )
}

export default Login