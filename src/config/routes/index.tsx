import { Suspense } from "react"
import SignRoutes from "./SignRoutes"

const Routes: React.FC = () => {
  return(
    <Suspense fallback={<h1>Carregando...</h1>}>
      <SignRoutes />
    </Suspense>
  )
}

export default Routes