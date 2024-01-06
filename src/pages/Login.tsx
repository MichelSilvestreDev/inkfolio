import { Button, Input } from "@nextui-org/react"

const Login: React.FC = () => {
  return (
    <div className="shadow-lg w-1/4 min-w-96 flex flex-col gap-10 p-8 rounded-sm">
      <div>
        <h1 className="text-2xl text-center font-bold">InkFolio</h1>
      </div>

      <div className="flex flex-col gap-4">
        <Input type="email" label="E-mail" radius="sm"/>
        <Input type="password" label="Senha" radius="sm"/>
        <Button className="rounded-md" color="primary" size="lg">
          Entrar
        </Button>
        <Button className="rounded-md" color="primary" size="lg" variant="ghost">
          Entrar com Google
        </Button>
        <Button className="rounded-md" color="primary" size="lg" variant="light">
          Criar conta
        </Button>
      </div>
    </div>
  )
}

export default Login