import { Button } from "@nextui-org/react"
import { useAuth } from "../hooks/auth/useAuth"

const Feed: React.FC = () => {
  // Hooks
  const { user, signOut } = useAuth()

  const handleLogout = async () => {
    await signOut()
    window.alert('Deslogado')
  }

  return (
    <div className="shadow-lg w-1/4 min-w-96 flex flex-col gap-10 p-8 rounded-sm">
      <h1>Bem vindo(a) { user.email }</h1>
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