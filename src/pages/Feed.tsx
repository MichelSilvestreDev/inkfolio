import { Button } from "@nextui-org/react"
import { useDispatch } from "react-redux"
import { logout } from "../store/auth/authSlice"

const Feed: React.FC = () => {
  // Hooks
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div className="shadow-lg w-1/4 min-w-96 flex flex-col gap-10 p-8 rounded-sm">
      <h1>LOGADO</h1>
      <Button
        className="rounded-md"
        color="primary"
        size="lg"
        variant="light"
        onClick={handleLogout}
      >
        Deslogar
      </Button>
    </div>
  )
}

export default Feed