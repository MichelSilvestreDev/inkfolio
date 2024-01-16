import { Suspense } from "react"
import SignRoutes from "./SignRoutes"
import { useSelector } from "react-redux"
import { selectUser } from "../../store/auth/authSlice"
import MainRoutes from "./MainRoutes"

const Routes: React.FC = () => {
  // Hooks
  const {isLogged} = useSelector(selectUser)

  return(
    <Suspense fallback={<h1>Carregando...</h1>}>
      {
        isLogged ? <MainRoutes /> : <SignRoutes />
      }
    </Suspense>
  )
}

export default Routes