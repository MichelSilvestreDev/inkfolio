import { Button, Input } from "@nextui-org/react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { changeUser } from "../store/auth/authSlice"

const Login: React.FC = () => {
  // Hooks
  const dispatch = useDispatch()
  // States
  const [userEmail, setUserEmail] = useState<string>('')

  const handleLogin = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    const user = {
      userID: 'aadiaushdajsndj',
      userName: userEmail.split('@')[0],
    }

    dispatch(changeUser(user))
  }

  return (
    <div className="shadow-lg w-1/4 min-w-96 flex flex-col gap-10 p-8 rounded-sm">
      <div>
        <h1 className="text-2xl text-center font-bold">InkFolio</h1>
      </div>

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
            required
          />
          <Button
            className="rounded-md"
            color="primary"
            size="lg"
            type="submit"
          >
            Entrar
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

export default Login