import { Suspense } from "react"
import SignRoutes from "./SignRoutes"
import { useSelector } from "react-redux"
import { selectUser } from "../../store/auth/authSlice"
import MainRoutes from "./MainRoutes"
import Cookies from 'js-cookie';

const Routes: React.FC = () => {
  // Hooks
  const {isLogged} = useSelector(selectUser)
  const token = Cookies.get('token')

  return(
    <Suspense fallback={<h1>Carregando...</h1>}>
      {
        token || isLogged ? <MainRoutes /> : <SignRoutes />
      }
    </Suspense>
  )
}

export default Routes