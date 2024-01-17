import { Button, Input } from "@nextui-org/react"
import { useState } from "react"
import { useAuth } from "../../hooks/auth/useAuth"
import { UserCredentials } from "../../types/auth.types"


const LoginContainer: React.FC = () => {
  // Hooks
  const { isLoading, sigIn } = useAuth()
  // States
  const [userEmail, setUserEmail] = useState<string>('')
  const [userPassword, setUserPassword] = useState<string>('')

  const handleLogin = async (event: { preventDefault: () => void }) => {
    const userCreds: UserCredentials = {
      userEmail: userEmail,
      userPassword: userPassword
    }
    event.preventDefault()
    await sigIn(userCreds)
  }

  return (
    <div className="shadow-lg w-1/4 min-w-96 flex flex-col gap-10 p-8 rounded-sm">
      <div>
        <h1 className="text-2xl text-center font-bold">InkFolio</h1>
      </div>

      {/* <Tabs aria-label="Options" color="default" variant="bordered">
        <Tab
          key="photos"
          title={
            <div className="flex items-center space-x-2">
              <User theme="outline" size="24" fill="#333" strokeWidth={3}/>
              <span>Sign</span>
            </div>
          }
        />
        <Tab
          key="music"
          title={
            <div className="flex items-center space-x-2">
              <User theme="outline" size="24" fill="#333" strokeWidth={3}/>
              <span>SigUp</span>
            </div>
          }
        />
      </Tabs> */}
      <form onSubmit={handleLogin}>
        <div className="flex flex-col gap-4">
          <Input
            type="email"
            label="E-mail"
            radius="sm"
            onChange={(event) => setUserEmail(event.target.value)}
            required
            />
          <Input
            type="password"
            label="Senha"
            radius="sm"
            onChange={(event) => setUserPassword(event.target.value)}
            required
          />
          <Button
            className="rounded-md"
            color="primary"
            size="lg"
            type="submit"
            disabled={isLoading}
          >
            { isLoading ? 'Carregando...' : 'Entrar' }
          </Button>
          <Button
            className="rounded-md"
            color="primary"
            size="lg"
            variant="ghost"
            type="submit"
          >
            Entrar com Google
          </Button>
          <Button className="rounded-md" color="primary" size="lg" variant="light">
            Criar conta
          </Button>
        </div>
      </form>
    </div>
  )
}

export default LoginContainer